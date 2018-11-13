class TodoCollection {

    constructor(bus) {
        // Local state
        this.collection = [];

        // Configuration
        this.localStorage_key = 'todos';

        this.bus = bus;

    }

    search(searchString){
        this.foundCollection = [];
        for(var i = 0; i < this.collection.length; i++){
            if(this.collection[i].name === searchString || this.collection[i].project === searchString){
                this.foundCollection.push(this.collection[i]);
            }
        }
        return this.foundCollection;
    }

    get(id) {
        return this.collection.find(function(el) {
            return el.uuid === id;
        });
    }

    all() {
        return this.collection;
    }

    // Saving collection to localStorage
    save() {
        localStorage.setItem(this.localStorage_key, JSON.stringify(this.collection));
    }

    // Adds a model to the collection and persists it
    add(model) {
        model.uuid = this.uuid();
        console.log(model.uuid);

        this.collection.push(model);
        this.save();
        this.bus.trigger('collectionUpdated');
    }

    delete(model) {
        for(var i = 0; i < this.collection.length; i++){
            console.log("COLLECTION: "+this.collection[i].uuid);
            if(this.collection[i].uuid === model){
                this.collection.splice(i, 1);
            }
        }
        this.save();
        this.bus.trigger('collectionUpdated');

    }

    // Fetch models from localStorage into collection
    fetch() {
        this.collection = JSON.parse(localStorage.getItem(this.localStorage_key)) || [];
        this.bus.trigger('collectionUpdated');
    }


    uuid() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        console.log(uuid);
        return uuid;
    }
}
