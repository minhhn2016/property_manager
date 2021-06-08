package controllers;

import org.junit.Test;
import play.Application;
import play.inject.guice.GuiceApplicationBuilder;
import play.mvc.Http;
import play.mvc.Result;
import play.test.WithApplication;
import play.libs.Json;

import com.fasterxml.jackson.databind.node.ObjectNode;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.*;
import static play.test.Helpers.*;
import static play.test.Helpers.route;
import static org.junit.Assert.assertTrue;

public class HomeControllerTest extends WithApplication {

	@Override
	protected Application provideApplication() {
		return new GuiceApplicationBuilder().build();
	}

	@Test
	public void testCreatePropertyMethod() {
		final ObjectNode jsonNode = Json.newObject();
		jsonNode.put("propertyName", "Test property");
		jsonNode.put("description", "Test");
		jsonNode.put("street", "Test street");
		jsonNode.put("number", 12);
		jsonNode.put("postalCode", "T35TC0D3");
		jsonNode.put("city", "TestCity");
		jsonNode.put("municipality", "Unknown");
		jsonNode.put("country", "Test Country Rep.");

		Http.RequestBuilder request = new Http.RequestBuilder()
			.method(POST)
			.bodyJson(jsonNode)
			.uri("/properties");

		Result result = route(app, request);
		assertEquals(CREATED, result.status());
		assertTrue(result.contentType().isPresent());
		assertEquals("application/json", result.contentType().get());

		// Test retrieving property created above
		Http.RequestBuilder request1 = new Http.RequestBuilder()
			.method(GET)
			.uri("/properties/0");

		Result result1 = route(app, request1);
		assertEquals(OK, result1.status());
		assertTrue(result1.contentType().isPresent());
		assertEquals("application/json", result1.contentType().get());

		// Test updating property created above
		jsonNode.put("id", 0);

		Http.RequestBuilder request2 = new Http.RequestBuilder()
			.method(PUT)
			.bodyJson(jsonNode)
			.uri("/properties");

		Result result2 = route(app, request2);
		assertEquals(OK, result2.status());
		assertTrue(result2.contentType().isPresent());
		assertEquals("application/json", result2.contentType().get());
	}

	@Test
	public void testListingMethod() {
		Http.RequestBuilder request = new Http.RequestBuilder()
			.method(GET)
			.uri("/properties");

		Result result = route(app, request);
		assertEquals(OK, result.status());
		assertTrue(result.contentType().isPresent());
		assertEquals("application/json", result.contentType().get());
	}

	@Test
	public void testRetrieveMethodNotFound() {
		Http.RequestBuilder request = new Http.RequestBuilder()
			.method(GET)
			.uri("/properties/0");

		Result result = route(app, request);
		assertEquals(NOT_FOUND, result.status());
		assertTrue(result.contentType().isPresent());
		assertEquals("application/json", result.contentType().get());
	}

	@Test
	public void testUpdatePropertyTofail() {
		final ObjectNode jsonNode = Json.newObject();
		jsonNode.put("propertyName", "Test property");
		jsonNode.put("description", "Test");
		jsonNode.put("street", "Test street");
		jsonNode.put("number", 12);
		jsonNode.put("postalCode", "T35TC0D3");
		jsonNode.put("city", "TestCity");
		jsonNode.put("municipality", "Unknown");
		jsonNode.put("country", "Test Country Rep.");

		Http.RequestBuilder request = new Http.RequestBuilder()
			.method(PUT)
			.bodyJson(jsonNode)
			.uri("/properties");

		Result result = route(app, request);
		assertEquals(INTERNAL_SERVER_ERROR, result.status());
		assertTrue(result.contentType().isPresent());
		assertEquals("application/json", result.contentType().get());
	}
}
