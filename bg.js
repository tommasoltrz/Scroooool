var scrolled_meters = 0;
var pos = 0;
var ex_pos = 0;
var changed_tab = false;

chrome.storage.sync.get('scrolled_distance', function(data) {
    var former_run = data.scrolled_distance;
    if (former_run != null && former_run != undefined) {
        scrolled_meters = former_run;
    }
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        changed_tab = true;
    } else {
        if (changed_tab == true) {
            get_scrolled_meters();
            changed_tab = false;
        }
    }
});

window.onscroll = function() {
    if (pos != window.scrollY && pos <= window.scrollY) {
        pos += Math.abs(pos - window.scrollY);;
        if (pos >= ex_pos + 3780) {
            scrolled_meters += 1;
            chrome.storage.sync.set({
                'scrolled_distance': scrolled_meters
            });
            console.log("meters: " + scrolled_meters);
            pos = window.scrollY;
            ex_pos = pos;
            check_event(scrolled_meters);
        }
    }
};

function get_scrolled_meters() {
    chrome.storage.sync.get('scrolled_distance', function(data) {
        var former_run = data.scrolled_distance;
        if (former_run != null && former_run != undefined) {
            scrolled_meters = former_run;
        }
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.meter_reset == 0)
            sendResponse({
                farewell: "reset done"
            });
        scrolled_meters = 0;
    });

function check_event(meters_to_be_compared) {
    var milestones = [56, 100, 324, 828, 1825, 8848, 10994, 50000, 560000, 12742000, 40075000, 384400000];
    for (var i = 0; i < milestones.length; i++) {
        if (meters_to_be_compared == milestones[i]){
          if (Notification.permission !== "granted")   Notification.requestPermission();
          else NotificationPopup(NotificationContent[i].title, NotificationContent[i].body, NotificationContent[i].icon, NotificationContent[i].link);
        }
    }
}
function NotificationPopup(title, body, icon, link) {
    var notification = new Notification(title, {
        icon: icon,
        body: body,
    });
    notification.onclick = function() {
        window.open(link);
    };
}

var NotificationContent = [{
    title: "Pisa Tower",
    body: "First milestone accomplished",
    link: 'https://en.wikipedia.org/wiki/Leaning_Tower_of_Pisa',
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/44747-200.png'
}, {
    title: "Football Field",
    body: "100 meters scrolled",
    link: 'https://en.wikipedia.org/wiki/Football_pitch',
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/2034-200.png'
}, {
    title: "Eiffel Tower",
    body: "324 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Eiffel_Tower',
    icon: 'https://marketplace.canva.com/MACI2bPFsqA/1/thumbnail_large/canva-eiffel-tower--MACI2bPFsqA.png'
}, {
    title: "Burj Khalifa",
    body: "828 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Burj_Khalifa',
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/194097-200.png'
}, {
    title: "Brooklyn Bridge",
    body: "1825 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Brooklyn_Bridge',
    icon: 'http://icons.iconarchive.com/icons/iconsmind/outline/512/Bridge-icon.png'
}, {
    title: "Mount Everest",
    body: "8848 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Mount_Everest',
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/16025-200.png'
}, {
    title: "Mariana Trench",
    body: "10994 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Mariana_Trench',
    icon: 'https://cdn0.iconfinder.com/data/icons/miscellaneous-26/64/submarine-submersible-ship-boat-512.png'
}, {
    title: "English Channel",
    body: "50000 meters scrolled",
    link:'https://en.wikipedia.org/wiki/English_Channel',
    icon: 'https://cdn4.iconfinder.com/data/icons/proglyphs-traveling/512/Boat-512.png'
}, {
    title: "Stratosphere",
    body: "560000 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Stratosphere',
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/30026-200.png'
}, {
    title: "Earth Diameter",
    body: "12742000 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Earth_radius',
    icon: 'https://image.flaticon.com/icons/png/512/44/44386.png'
}, {
    title: "Equator",
    body: "40075000 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Equator',
    icon: 'https://image.flaticon.com/icons/png/512/44/44386.png'
}, {
    title: "Lunar Distance",
    body: "384400000 meters scrolled",
    link:'https://en.wikipedia.org/wiki/Lunar_distance_(astronomy)',
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/139157-200.png'
}]
