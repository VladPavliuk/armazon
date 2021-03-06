/**
 * Start when set value in input.
 *
 * @param profile
 * @param size
 * @param color
 * @param count
 */
function inputCount(profile, size, color, count) {

    addToCart(profile, size, color, count);

    var inputId = "#" + profile + "-" + size + "-" + color;

    var hideButton = $(inputId).parent().find('.remove');

    if (count > 0) {

        showRemoveButton(hideButton);
    } else {

        hideRemoveButton(hideButton);
    }
}

/**
 * Send count of current frame to shopping cart.
 *
 * @param profile
 * @param size
 * @param color
 * @param count
 */
function addToCart(profile, size, color, count) {

    var inputId = "#" + profile + "-" + size + "-" + color;

    if (liveInputValid(inputId, count)) {

        updateSingleFramePriceSum(profile, size, color, count);
        updateTotalInfo(profile, size, color, count);
    }
}

function updateTotalInfo(profile, size, color, count) {

    var params = profile + '/' + size + '/' + color;
    var urlRequst = "cart-add/" + params + "/" + count;

    $.get(urlRequst, function (response) {

        var dataArray = JSON.parse(response);

        var totalCount = dataArray.totalCount;
        var totalPrice = dataArray.totalPrice;
        var firstDiscount = dataArray.firstDiscount;
        var secondDiscount = dataArray.secondDiscount;

        if (firstDiscount === true) {
            $(".first-discount").css("display", "block");
        } else {
            $(".first-discount").css("display", "none");
        }

        if (secondDiscount === true) {
            $(".second-discount").css("display", "block");
        } else {
            $(".second-discount").css("display", "none");
        }

        emptyCartHtmlRender(totalCount);

        updateTotalCount(totalCount);
        updateTotalPrice(totalPrice);

        return true;
    });
}

function updateSingleFramePriceSum(profile, size, color, count) {
    var params = profile + '/' + size + '/';
    var urlRequst = "frame-get-price/" + params;

    $.get(urlRequst, function (response) {
        var singleFramePrice = JSON.parse(response);

        var rowId = "#" + profile + "_" + size + "_" + color;
        var singleFramePriceSum = +count * +singleFramePrice;

        $(rowId + " .single-frame-total-sum").text(singleFramePriceSum + " грн.");
    });
}

function emptyCartHtmlRender(totalCount) {
    if (totalCount <= 0) {

        var text = '<div style="margin-bottom: 400px;">' +
            '<div class="page-header">' +
            '<h2 >Ваша корзина порожня.</h2>' +
            '</div>' +
            '<p class="lead"><a href="/#profiles-list">Заповнити?</a></p>' +
            '</div>';

        $('.shopping-cart').html(text);
    }
}

/**
 * Validate value of input.
 *
 * @param inputId
 * @param inputValue
 * @returns {boolean}
 */
function liveInputValid(inputId, inputValue) {

    if (inputValue == 0) {
        $(inputId).val(null);

        return true;
    }

    if (inputValue < 0) {
        $(inputId).val(null);
        return false;
    }

    return true;
}

/**
 * Clear input value and send zero count of current frame.
 *
 * @param profile
 * @param size
 * @param color
 * @param removeButton
 */
function clearInput(profile, size, color, removeButton) {


    hideRemoveButton(removeButton);
    addToCart(profile, size, color, 0);
    removeButton.parent().fadeOut("fast");
}

/**
 * SHOW Button which remove input value by clicking.
 *
 * @param removeButton
 */
function showRemoveButton(removeButton) {
    removeButton.removeClass("hide");
}

/**
 * HIDE Button which remove input value by clicking.
 *
 * @param removeButton
 */
function hideRemoveButton(removeButton) {
    removeButton.addClass("hide");
}

/**
 * Set value of total COUNT of frame in tag.
 *
 * @param totalCount
 */
function updateTotalCount(totalCount) {
    $(".total-count").text(totalCount);
}

/**
 * Set value of total PRICE of frame in tag.
 *
 * @param totalPrice
 */
function updateTotalPrice(totalPrice) {
    $(".total-price").text(totalPrice);
}
