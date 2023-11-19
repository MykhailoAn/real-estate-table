(function () {
  class Property {
    constructor(data) {
      this.number = data.number;
      this.type = data.type;
      this.city = data.city;
      this.price = data.price;
      this.id = data.id;
    }
  }

  class PropertyModel {
    constructor() {
      this.properties = [];
      this.cities = [];
      this.types = [];
    }

    getProperties() {
      return $.ajax({
        url: 'http://localhost:3000/properties',
        type: 'GET',
        dataType: 'json',
      });
    }

    getCities() {
      return $.ajax({
        url: 'http://localhost:3000/city',
        type: 'GET',
        dataType: 'json',
      });
    }

    getTypes() {
      return $.ajax({
        url: 'http://localhost:3000/type',
        type: 'GET',
        dataType: 'json',
      });
    }

    getNextNumber() {
      // Ensure the array is not empty
      if (this.properties.length === 0) {
        return 1; // or any default value you prefer
      }

      // Find the maximum number in the array
      const maxNumber = Math.max.apply(
        null,
        this.properties.map((property) => property.number),
      );

      // Return the next number (maximum + 1)
      return maxNumber + 1;
    }

    saveData() {
      return $.ajax({
        url: 'http://localhost:3000/update-all-properties',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(this.properties), // convert the data to JSON format
      });
    }
  }

  window.app = window.app || {};
  window.app.Property = Property;
  window.app.PropertyModel = PropertyModel;
})();
