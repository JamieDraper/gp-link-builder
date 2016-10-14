var urls ={};
var URLBuilder = {
        
    userInput : {
        baseUrl : "",
        subSource : ""
    },
    
    init : function() {
        this.userInput.baseUrl = $('#base-url').val();
        this.userInput.subSource = $('#subsource').val();
        this.userInput.tySource = $('#tysource').val();
        this.userInput.testingMode = $('#testing').is(':checked');
        this.generateUrls();
        this.renderUrls();
        return false;
    },

    appendNonRequiredCodes: function(codes) {
        for(var code in codes) {
            if(codes[code]) {
                // code specified, append to all urls
                for (var url in urls) {
                    urls[url] += "&" + code + "=" + codes[code];
                }
            }
        }
    },

    generateUrls : function() {
        // generate urls from input
        var baseUrl = this.userInput.baseUrl,
            subSource = this.userInput.subSource,
            utmSource = "gpeace",
            testing = this.userInput.testingMode,
            sources = {
                standard: "CL",
                ads: "FP"
            },
            nonRequiredCodes = {
                "tysource": this.userInput.tySource
            };
        if (testing) {
            for(var source in sources) {
                var testSource = "zzz" + sources[source];
                sources[source] = testSource;
            }
        }

        urls = {
            "standard" : "?source="+sources.standard+"&subsource="+subSource+"&utm_medium="+sources.standard+"&utm_source="+utmSource+"&utm_campaign="+subSource,
            "ads" : "?source="+sources.ads+"&subsource="+subSource+"&utm_medium="+sources.ads+"&utm_source="+utmSource+"&utm_campaign="+subSource
        };
        $.each(urls, function(key, value){
            // prepend base url
            var thisUrl = baseUrl + value;
            urls[key] = thisUrl;
        });

        this.appendNonRequiredCodes(nonRequiredCodes);
    },
    
    renderUrls : function() {
        // add urls to table
        $('.link-output').each(function(){
            var thisKey = $(this).attr('data-key');
            var thisUrl = urls[thisKey];
            if (thisUrl) {
                $(this).find('a').html(thisUrl);
            }
        });
    }
}

$(function() {

    // Initialise 'copy' buttons
    new Clipboard('table .btn');

});

