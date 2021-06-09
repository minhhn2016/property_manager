import os
import bottle
import requests
from bottle import request, response, get, put, post, delete, hook


from src.logger import get_module_logger

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
      if len(properties_list["list"]):
        x = [item.get("position").get("longitude") for item in properties_list["list"]]
        y = [item.get("position").get("latitude") for item in properties_list["list"]]
        properties_list["center"] = [sum(x) / len(properties_list["list"]), sum(y) / len(properties_list["list"])]

      return properties_list
  except Exception as e:
    log.debug("ERROR: Could not get list - {}".format(e))
    return


app = bottle.app()

if __name__ == "__main__":
  bottle.run(
    app=app,
    debug=True,
    reloader=True,
    server="gunicorn",
    workers=1
  )