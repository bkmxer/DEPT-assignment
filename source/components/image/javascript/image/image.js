import Events from '@utilities/events';
import './lazy-image';
import './object-fit';

class Image {

    constructor() {

        Events.$trigger('image::object-fit');

    }

}

export default new Image();
