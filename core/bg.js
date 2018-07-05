var enableProxy = function() {
    _proxy.update(function success() {
        controlCheck({
            controllable: true
        });
        iconSwitch(true);
    }, function error() {
        controlCheck({
            controllable: false
        });
    });
}

var disableProxy = function() {
    _proxy.disable(function() {
        iconSwitch(false);
    });
}


var controlCheck = function(details) {
    if (!details.controllable) {
        chrome.storage.sync.set({
            'proxIsOn': false,
            'proxIsControllable': false
        });
        badgeSwitch(true);
        return false;
    } else {
        chrome.storage.sync.set({
            'proxIsControllable': true
        });
        badgeSwitch(false);
        return true;
    }
};

var iconSwitch = function(isActive) {
    var iconPath = isActive ? '/img/128on.png' : '/img/128off.png';
    chrome.browserAction.setIcon({
        path: iconPath
    });
};

var badgeSwitch = function(isVisible) {
    var badgeText = isVisible ? '!' : '';
    chrome.browserAction.setBadgeText({
        text: badgeText
    });
    chrome.browserAction.setBadgeBackgroundColor({
        color: '#F00'
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    _proxy.onControlChange(controlCheck);

    chrome.storage.onChanged.addListener(function(change) {
        if (change.proxIsOn !== undefined) {
            if (change.proxIsOn.newValue === true) {
                enableProxy();
            } else {
                disableProxy();
            }
        }
    });

    _proxy.addSite({
        domain: "yandex.*"
    });
    _proxy.addSite({
        domain: "*.yandex.*"
    });
    _proxy.addSite({
        domain: "ya.ru"
    });
    _proxy.addSite({
        domain: "*.ya.ru"
    });
    _proxy.addSite({
        domain: "ya.cc"
    });
    _proxy.addSite({
        domain: "metrika.yandex.ru"
    });
    _proxy.addSite({
        domain: "yandex-launcher.com"
    });
    _proxy.addSite({
        domain: "yandexdatafactory.ru"
    });
    _proxy.addSite({
        domain: "yandexlauncher.com"
    });
    _proxy.addSite({
        domain: "yandexlyceum.ru"
    });
    _proxy.addSite({
        domain: "yandextrafik.com.tr"
    });
    _proxy.addSite({
        domain: "yandex-school.ru"
    });
    _proxy.addSite({
        domain: "yandexdatafactory.com"
    });
    _proxy.addSite({
        domain: "yandexdataschool.*"
    });
    _proxy.addSite({
        domain: "yandex-ad.cn"
    });
    _proxy.addSite({
        domain: "yandexadexchange.net"
    });
    _proxy.addSite({
        domain: "yaani.ru"
    });
    _proxy.addSite({
        domain: "yandex-amp.net"
    });
    _proxy.addSite({
        domain: "*.yandex-amp.net"
    });
    _proxy.addSite({
        domain: "*.yandex-launcher.com"
    });
    _proxy.addSite({
        domain: "*.yandexdatafactory.ru"
    });
    _proxy.addSite({
        domain: "*.yandexlauncher.com"
    });
    _proxy.addSite({
        domain: "*.yandexlyceum.ru"
    });
    _proxy.addSite({
        domain: "*.yandextrafik.com.tr"
    });
    _proxy.addSite({
        domain: "*.yandex-school.ru"
    });
    _proxy.addSite({
        domain: "*.yandexdatafactory.com"
    });
    _proxy.addSite({
        domain: "*.yandexdataschool.*"
    });
    _proxy.addSite({
        domain: "*.yandex-ad.cn"
    });
    _proxy.addSite({
        domain: "*.yandexadexchange.net"
    });

    chrome.storage.sync.get(function(change) {
        if (change.proxIsOn !== undefined) {
            if (change.proxIsOn === true) {
                enableProxy();
            } else {
                disableProxy();
            }
        } else {
            chrome.storage.sync.set({
                'proxIsOn': true
            });
        }
    });
});