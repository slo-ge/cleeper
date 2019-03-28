import Sortable from 'sortablejs';


export const CONTAINER = 'clips';
export const ITEMS = 'clipped';
export const REMOVE_CLASS = 'card-remove';

class LayoutSortableJsController {

    sortable = null;

    constructor() {
        let el = document.getElementById(CONTAINER);
        this.sortable = Sortable.create(el,
            {
                animation: 150,
                ghostClass: 'dnd-move'
            }
        );
    }

    add(elem) {
        document.getElementById(CONTAINER).append(elem);
        elem.addEventListener('click', this.clickHandler.bind(elem), false);
    }

    clickHandler(evt){
        console.log(elem);
        elem.remove();
    }
}

export default LayoutSortableJsController;