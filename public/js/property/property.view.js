(function () {
  class PropertyView {
    constructor() {
      this.DOMElements = {
        tableBody: $('#myTable tbody'),
        addRowBtn: $('#addRow'),
        saveBtn: $('#save'),
      };
    }

    renderProperties(properties, cities, types) {
      this.DOMElements.tableBody.empty();
      properties.forEach((property) => {
        this.addRow(property, cities, types);
      });
    }

    addRow(property, cities, types) {
      let newRow = '<tr>';
      newRow += '<td>' + property.number + '</td>';
      newRow += `<td><input type="text" disabled value="${property.id}"></td>`;
      newRow += `<td><input class="price-input" type="number" data-id="${property.id}" value="${property.price}"></td>`;
      newRow += `<td><select data-id="${property.id}" class="form-control city-select2" style="width: 100%;"></select></td>`;
      newRow += `<td><select data-id="${property.id}" class="form-control type-select2" style="width: 100%;"></select></td>`;
      newRow += `<td><button data-id="${property.id}" class="btn btn-primary copyRow">copy</button> <button data-id="${property.id}" class="btn btn-danger deleteRow">delete</button></td>`;
      newRow += '</tr>';
      $('#myTable tbody').append(newRow);

      // Initialize Select2 for the newly added row
      const $citySelect = $('.city-select2:last');
      const $typeSelect = $('.type-select2:last');

      this.initializeSelect2(cities, $citySelect);
      this.initializeSelect2(types, $typeSelect);

      // Set the selected city and type if available in the data
      if (property.city) {
        $citySelect.val(property.city).trigger('change');
      }
      if (property.type) {
        $typeSelect.val(property.type).trigger('change');
      }
    }

    initializeSelect2(data, $selectElement) {
      $selectElement.select2({
        placeholder: 'Select an option',
        data: data,
      });
    }
  }

  window.app = window.app || {};
  window.app.PropertyView = PropertyView;
})();
