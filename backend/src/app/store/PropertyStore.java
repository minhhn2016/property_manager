package store;

import models.Property;

import java.util.*;

public class PropertyStore {
  private Map<Integer, Property> properties = new HashMap<>();

  public Optional<Property> addProperty(Property property) {
    int id = properties.size();
    property.setId(id);
    properties.put(id, property);
    
    return Optional.ofNullable(property);
  }
  public Optional<Property> getProperty(int id) {
    return Optional.ofNullable(properties.get(id));
  }

  public Set<Property> getAllProperties() {
    return new HashSet<>(properties.values());
  }

  public Optional<Property> updateProperty(Property property) {
    int id = property.getId();
    if (properties.containsKey(id)) {
      properties.put(id, property);
      return Optional.ofNullable(property);
    }
    return Optional.ofNullable(null);
  }

  public boolean deleteProperty(int id) {
    return properties.remove(id) != null;
  }
}