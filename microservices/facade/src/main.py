import os
import bottle
import requests
import yaml
from bottle import request, response, get, put, post, delete
from wsgicors import CORS


from src.logger import get_module_logger
from src.common import validate_json_body

log = get_module_logger(__name__)
log.debug("Starting...")

api_url = os.environ.get("API_URL", "http://backend:9000")


with open("config.yaml") as config_file:
    config = yaml.load(config_file, Loader=yaml.FullLoader)


@get("/api/properties/all")
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
    response.status = 400
    return

  
@get("/api/properties/<id>")
def get_property_by_id(id):
  try:
    reponse_json = requests.get("{}/properties/{}".format(api_url, id)).json()
    return reponse_json.get("body")
  except Exception as e:
    log.error("ERROR: Could not get property with ID {} - {}".format(id, e))
    response.status = 400
    return


@post("/api/properties")
@validate_json_body(schema_filename="schema/create_property_schema.json")
def create_property():
  log.debug("REQUEST:::: {}".format(request))
  body = request.json
  try:
    response = requests.post("{}/properties".format(api_url), json=body)
    return response
  except Exception as e:
    log.error("ERROR: Could not create property- {}".format(e))
    response.status = 400
    return


@put("/api/properties")
@validate_json_body(schema_filename="schema/update_property_schema.json")
def update_property():
  body = request.json
  try:
    response = requests.put("{}/properties".format(api_url), json=body)
    return response
  except Exception as e:
    log.error("ERROR: Could not update property with ID {} - {}".format(id, e))
    response.status = 400
    return


@delete("/api/properties/<id>")
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
    response.status = 400
    return

corscfg = config.get("cors")
app = CORS(
  bottle.app(),
  headers=corscfg["headers"],
  methods=corscfg["methods"],
  origin=corscfg["origin"],
  expose_headers=corscfg["expose_headers"],
)


if __name__ == "__main__":
  bottle.run(
    app=app,
    debug=True,
    reloader=True,
    server="gunicorn",
    workers=1
  )