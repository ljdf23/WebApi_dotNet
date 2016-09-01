var model = {
    view: ko.observable("welcome"),
    rsvp : {
        name: ko.observable(""),
        email: "",
        willattend: ko.observable("true")
    },
    attendes: ko.observableArray([])
}

var showForm = function()
{
    model.view("form");
}

var sendRsvp = function() {
    $.ajax("/api/rsvp", {
        type: "POST",
        data: {
            name: model.rsvp.name(),
            email: model.rsvp.email,
            willattend: model.rsvp.willattend()
        },

        success: function() {
            getAttendes();
        }
    });
}

var getAttendes = function() {
        $.ajax("/api/rsvp",
        {
            type: "GET",
            success: function(data) {
                model.attendes.removeAll();
                model.attendes.push.apply(model.attendes, data.map(function(rsvp) {
                    return rsvp.Name;
                }));

                model.view("thanks");
            }
        });
}

$(document).ready(function() {
    ko.applyBindings();
});
 