(function ($) {
    'use strict';

    $.fn.extend({
        annotate: function (options) {

            var defaults = {
                cts2Service: "http://informatics.mayo.edu/cts2/services/tlamp/",
                trigger: 'hover' ,
                uriDataAttr: 'uri',
                hrefDataAttr: 'href'
                };

            options = $.extend(defaults, options);

            return this.each(function(idx) {
                var $item = $(this);
                var uri = $item.data(options.uriDataAttr);
                var href = $item.data(options.hrefDataAttr);

                var className = "dynamicContent" + idx.toString();
                var content = '<div class="'+className+'">Loading...</div>';

                $item.popover({
                    trigger: options.trigger,
                    html: true,
                    content: function(){return content}
                });

                var url = href ? href + "?format=json" : options.cts2Service + "/entitybyuri?format=json&uri=" + uri;

                $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    jsonpCallback: 'annotateCallback',
                    cache: true,
                    success: function(response){
                        var designation = response.EntityDescriptionMsg.entityDescription.classDescription.designation[0].value;
                        var id = response.EntityDescriptionMsg.entityDescription.classDescription.entityID
                        content = "";
                        content += "<b>Name:</b> " + id.name;
                        content += "<br/><b>Namespace:</b> " + id.namespace;
                        content += "<br/><b>Designation:</b> " + designation;

                        $('.' + className).html(content);
                    }
                });
            });
        },

        valueset: function (options) {

            var defaults = {
                cts2Service: "http://informatics.mayo.edu/cts2/services/tlamp/",
                uriDataAttr: 'uri',
                href: null
            };

            options = $.extend(defaults, options);

            return this.each(function(idx) {
                var $item = $(this);
                var uri = $item.data(options.uriDataAttr);

                var href = options.href ? options.href : options.cts2Service + "/valuesetdefinitionbyuri/resolution?format=json&uri=" + uri;

                $.ajax({
                    url: href,
                    dataType: 'jsonp',
                    jsonpCallback: 'valuesetCallback' + $item.attr('id'),
                    cache: true,
                    success: function(response){
                        for(var i in response.IteratableResolvedValueSet.entry) {
                            var entry = response.IteratableResolvedValueSet.entry[i];
                            var key = entry.name;
                            var value = entry.name;
                            var designation = entry.designation;

                            $item.append($("<option></option>")
                                .attr("value",key)
                                .text(value + " - " + designation));
                        }
                    }
                });
            });
        },

        tree: function (options) {

            var defaults = {
                cts2Service: "http://informatics.mayo.edu/cts2/services/tlamp/",
                uriDataAttr: 'uri',
                hrefDataAttr: 'href'
            };

            options = $.extend(defaults, options);

            var $root = $(this);

            return this.each(function(idx) {
                var $item = $(this);
                var uri = $item.data(options.uriDataAttr);
                var href = $item.data(options.hrefDataAttr);

                $.ajax({
                    url: href,
                    dataType: 'jsonp',
                    jsonpCallback: 'treeCallback',
                    cache: true,
                    success: function(response){
                        var root = response.AssociationGraph.focusEntity;

                        $root.append("<span><i class=\"glyphicon glyphicon-plus-sign\"></i></span>" + root.name);
                    }
                });
            });
        }

    });
}(jQuery));

