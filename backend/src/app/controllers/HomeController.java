package controllers;

import play.mvc.*;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.inject.Inject;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletionStage;
import static java.util.concurrent.CompletableFuture.supplyAsync;

import utils.Util;

import models.Property;
import store.PropertyStore;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

  /**
   * Controllers were configured based on this guide: 
   * https://www.baeldung.com/rest-api-with-play
   */
  private HttpExecutionContext executionContext;
  private PropertyStore propertyStore;

  @Inject
  public HomeController(HttpExecutionContext executionContext, PropertyStore propertyStore) {
    this.propertyStore = propertyStore;
    this.executionContext = executionContext;
  }

  public CompletionStage<Result> create(Http.Request request) {
    JsonNode json = request.body().asJson();
    return supplyAsync(() -> {
      if (json == null) {
        return badRequest(Util.createResponse("Expecting Json data", false));
      }

      Optional<Property> propertyOptional = propertyStore.addProperty(Json.fromJson(json, Property.class));
      return propertyOptional.map(property -> {
        JsonNode jsonObject = Json.toJson(property);
        return created(Util.createResponse(jsonObject, true));
      }).orElse(internalServerError(Util.createResponse("Could not create data.", false)));
    }, executionContext.current());
  }

  public CompletionStage<Result> listProperties() {
    return supplyAsync(() -> {
      Set<Property> result = propertyStore.getAllProperties();
      ObjectMapper mapper = new ObjectMapper();
      JsonNode jsonData = mapper.convertValue(result, JsonNode.class);
      return ok(Util.createResponse(jsonData, true));
    }, executionContext.current());
  }

}
