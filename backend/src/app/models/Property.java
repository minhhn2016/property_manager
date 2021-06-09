package models;

public class Property {
  private int id;
  private String propertyName;
  private String description;
  private String street;
  private int number;
  private String postalCode;
  private String city;
  private String municipality;
  private String country;
  private Position position;

  public Property() {}

  public Property(
    int id,
    String propertyName,
    String description,
    String street,
    int number,
    String postalCode,
    String city,
    String municipality,
    String country,
    Position position
  ) {
    this.id = id;
    this.propertyName = propertyName;
    this.description = description;
    this.street = street;
    this.number = number;
    this.postalCode = postalCode;
    this.city = city;
    this.municipality = municipality;
    this.country = country;
    this.position = position;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getPropertyName() {
    return propertyName;
  }

  public void setPropertyName(String propertyName) {
    this.propertyName = propertyName;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getStreet() {
    return street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public int getNumber() {
    return number;
  }

  public void setNumber(int number) {
    this.number = number;
  }

  public String getPostalCode() {
    return postalCode;
  }

  public void setPostalCode(String postalCode) {
    this.postalCode = postalCode;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getMunicipality() {
    return municipality;
  }

  public void setMunicipality(String municipality) {
    this.municipality = municipality;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public Position getPosition() {
    return position;
  }

  public void setPosition(Position position) {
    this.position = position;
  }
}