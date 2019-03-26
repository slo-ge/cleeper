import Muuri from 'muuri';

export const CONTAINER = '#clips';
export const ITEMS = '.clipped';
export const REMOVE_CLASS = 'card-remove';

class DragAndDropEditor {

    _grid = null;

    constructor() {
        this._grid = new Muuri(CONTAINER, {
            items: ITEMS,
            dragEnabled: true
        }).on('move', function () {
        });
    }

    get grid() {
        return this._grid;
    }

    add(elem) {
        this._grid.add(elem);
        elem.addEventListener('click', this.remove.bind(this, elem));
    }

    /**
     * TODO: remove function
     * @param elem
     */
    remove(elem) {
        //console.log('rem', elem);
        //this._grid.remove(elem);
        // this.updateIndices();
    }


    updateIndices() {
        this._grid.getItems().forEach(function (item, i) {
            item.getElement().setAttribute('data-id', i + 1);
            item.getElement().querySelector('.card-id').innerHTML = i + 1;
        });
    }

    elementClosest(element, selector) {
        return element.closest(selector);
    }
}

export default DragAndDropEditor;