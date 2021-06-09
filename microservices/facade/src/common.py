import json
import jsonschema
from functools import wraps

from bottle import request

from src.logger import get_module_logger

log = get_module_logger(__name__)


def validate_json_body(schema_filename=None):
  """This decorator is meant for validating the json_body in a request against schemas. The schema should be provided as a relative path"""

  def validate_json_decorator(function):

    @wraps(function)
    def wrapper(*args, **kwargs):
      try:
        with open(schema_filename, "r") as schema_file:
          schema = json.load(schema_file)
          jsonschema.validate(request.json, schema)

      except jsonschema.ValidationError as ve:
        log.error("ERROR: Failed to validate JSON body - {}".format(ve))

      except Exception as e:
        log.error("ERROR: Unhandled exception during validating JSON body - {}".format(e))
      
      return function(*args, **kwargs)

    return wrapper

  return validate_json_decorator