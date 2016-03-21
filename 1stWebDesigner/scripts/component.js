function Component() {
    this.elem = null; //$(sSelector)

    //метод для иницивлизации главного свойства this.elem
    this.init = function(sSelector) {
        this.elem = $(sSelector);
        if (!this.elem.length) {
            alert('Can\'n access element by selector: ' + sSelector);
        };
    };
    this.find = function(sProp) {
        var find_result = this.elem.find(sProp);
        if (find_result.length) {
            return find_result;
        } else alert('Can\'n access element by selector: ' + sProp);
    };
    this.copyData = function(oSource, oDestination, aFieldNames) {
        $.each(aFieldNames, function(i, fieldName) {
            var oSourceElement = oSource.find(fieldName),
                oDestinationElement = oDestination.find(fieldName),
                tagName = oSourceElement.prop('tagName'); //имя тега которое соответсвует считаному елементу
            if (tagName == 'IMG') {
                oDestinationElement.attr('src', oSourceElement.attr('src'));
            } else if (tagName == 'INPUT' || tagName == 'TEXTAREA') {
                oDestinationElement.val(oSourceElement.val());
            } else {
                oDestinationElement.html(oSourceElement.html());
            }
        });
    };
};
