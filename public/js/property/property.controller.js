(function () {
  class PropertyController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.init();
    }

    bindEvents() {
      this.view.DOMElements.addRowBtn.on('click', () => {
        const newProperty = new window.app.Property({
          number: this.model.getNextNumber(),
          type: this.model.types[0],
          city: this.model.cities[0],
          price: 0,
          id: null,
        });
        this.model.properties.push(newProperty);
        this.view.addRow(newProperty, this.model.cities, this.model.types);
      });

      this.view.DOMElements.saveBtn.on('click', (event) => {
        this.model
          .saveData()
          .then((properties) =>
            this.view.renderProperties(
              properties,
              this.model.cities,
              this.model.types,
            ),
          );
      });

      // Handler for price input
      this.view.DOMElements.tableBody.on('change', '.price-input', (event) => {
        const priceValue = $(event.target).val();
        const dataId = $(event.target).data('id');

        const property = this.model.properties.find(
          (property) => property.id === dataId,
        );

        property && (property.price = priceValue);
      });

      // Handler for city input
      this.view.DOMElements.tableBody.on('change', '.city-select2', (event) => {
        const cityValue = $(event.target).val();
        const dataId = $(event.target).data('id');

        const property = this.model.properties.find(
          (property) => property.id === dataId,
        );

        property && (property.city = cityValue);
      });

      // Handler for type input
      this.view.DOMElements.tableBody.on('change', '.type-select2', (event) => {
        const typeValue = $(event.target).val();
        const dataId = $(event.target).data('id');

        const property = this.model.properties.find(
          (property) => property.id === dataId,
        );

        property && (property.type = typeValue);
      });

      // Handler for delete button
      this.view.DOMElements.tableBody.on('click', '.deleteRow', (event) => {
        $(event.currentTarget).closest('tr').remove();

        const dataId = $(event.target).data('id');

        this.model.properties.splice(
          this.model.properties.findIndex((p) => {
            return p.id === dataId;
          }),
          1,
        );
      });

      // Handler for copy button
      this.view.DOMElements.tableBody.on('click', '.copyRow', (event) => {
        const dataId = $(event.target).data('id');

        const propertyToCopy = this.model.properties.find(
          (property) => property.id === dataId,
        );

        if (!propertyToCopy) {
          return;
        }

        const newProperty = {
          ...propertyToCopy,
          id: null,
          number: this.model.getNextNumber(),
        };

        this.model.properties.push(newProperty);

        this.view.addRow(newProperty, this.model.cities, this.model.types);
      });
    }

    init() {
      Promise.all([
        this.model.getCities(),
        this.model.getTypes(),
        this.model.getProperties(),
      ])
        .then(([cities, types, properties]) => {
          // Store city and type data globally
          this.model.properties = properties;
          this.model.cities = cities;
          this.model.types = types;

          // Example: Add a row with data obtained from the AJAX call
          this.view.renderProperties(
            properties,
            this.model.cities,
            this.model.types,
          );

          this.bindEvents();
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }
  }

  window.app = window.app || {};
  window.app.PropertyController = PropertyController;
})();
