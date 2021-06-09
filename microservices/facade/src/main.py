import os
import bottle
import requests
from bottle import request, response, get, put, post, delete, hook


from src.logger import get_module_logger
from src.common import validate_json_body

log = get_module_logger(__name__)
log.debug("Starting...")

api_url = os.environ.get("API_URL", "http://backend:9000")

_allow_origin = "*"
_allow_methods = "PUT, GET, POST, DELETE, OPTIONS"
_allow_headers = "Authorization, Origin, Accept, Content-Type, X-Requested-With"

@hook("after_request")
def enable_cors():
  """
    Using bottle's hooks plugin to support cors for request from frontend
    http://bottlepy.org/docs/dev/recipes.html#using-the-hooks-plugin
  """
  response.headers["Access-Control-Allow-Origin"] = _allow_origin
  response.headers["Access-Control-Allow-Methods"] = _allow_methods
  response.headers["Access-Control-Allow-Headers"] = _allow_headers


@get("/properties/all")
def list_all_properties():
  try:
    response_json = requests.get("{}/properties".format(api_url)).json()
    properties_list = {
      "list": [],
      "center": []
    }
    if response_json.get("isSuccessful") == True:
      properties_list["list"] = response_json.get("body", [])

      """
        Calculate center coordinate of the list.
        The intention is to provide an approximate center point
        for displaying the whole list on map component.
        Curvature of the Earth wasn't considered.
      """
      list_length = len(properties_list["list"])
      if list_length:
        x = [item.get("position").get("longitude") for item in properties_list["list"]]
        y = [item.get("position").get("latitude") for item in properties_list["list"]]
        properties_list["center"] = [sum(y) / list_length, sum(x) / list_length]

      return properties_list
  except Exception as e:
    log.error("ERROR: Could not get list - {}".format(e))
    return

  
@get("/properties/<id>")
def get_property_by_id(id):
  try:
    reponse_json = requests.get("{}/properties/{}".format(api_url, id)).json()
    return reponse_json.get("body")
  except Exception as e:
    log.error("ERROR: Could not get property with ID {} - {}".format(id, e))
    return


@post("/properties")
@validate_json_body(schema_filename="schema/create_property_schema.json")
def create_property():
  body = request.json
  try:
    response = requests.post("{}/properties".format(api_url), json=body)
    return response
  except Exception as e:
    log.error("ERROR: Could not create property- {}".format(e))


@put("/properties/<id>")
@validate_json_body(schema_filename="schema/update_property_schema.json")
def update_property(id):
  body = request.json
  try:
    existing_property = get_property_by_id(id)
    if not isinstance(existing_property, str):
      response = requests.put("{}/properties/{}".format(api_url, id), json=body)
      return response
    else:
      log.debug("ERROR: Could not update property - {}".format(existing_property))
  except Exception as e:
    log.error("ERROR: Could not update property with ID {} - {}".format(id, e))


@delete("/properties/<id>")
def delete_property(id):
  try:
    existing_property = get_property_by_id(id)
    if not isinstance(existing_property, str):
      response = requests.delete("{}/properties/{}".format(api_url, id))
      return response
    else:
      log.debug("ERROR: Could not delete property - {}".format(existing_property))
  except Exception as e:
    log.error("ERROR: Could not delete property with ID {} - {}".format(id, e))


app = bottle.app()

if __name__ == "__main__":
  bottle.run(
    app=app,
    debug=True,
    reloader=True,
    server="gunicorn",
    workers=1
  )