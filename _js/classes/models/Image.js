var Image = Backbone.Model.extend({

    readFile: function(file) {
        var reader = new FileReader();
        // closure to capture the file information.
        reader.onload = (function(theFile,that) {
            return function(e) {
                //set model
                that.set({filename: theFile.name, data: e.target.result});

            };
        })(file,this);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }   
});