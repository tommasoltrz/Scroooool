document.addEventListener('DOMContentLoaded', function() {
    console.log("notifications");
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }
    if (Notification.permission !== "granted")
        Notification.requestPermission();
});

var bttn = document.getElementById('reset');

bttn.onmousedown = function() {
    bttn.classList.add('clicked');
};

bttn.onmouseup = function() {
    bttn.classList.remove('clicked');
};
bttn.onclick = function() {
    chrome.storage.sync.set({
        'scrolled_distance': 0
    });
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            meter_reset: 0
        }, function(response) {});
    });
};

var fileDisplayArea = document.getElementById('meters');
chrome.storage.sync.get('scrolled_distance', function(data) {
    fileDisplayArea.innerText = data.scrolled_distance + " Meters scrolled";
    check_milestone(data.scrolled_distance);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes["scrolled_distance"]) {
        var scrolled_meters = changes["scrolled_distance"].newValue;
        fileDisplayArea.innerText = scrolled_meters + " Meters scrolled";
    }
});

function check_milestone(meters_to_be_compared) {
    var milestones = [56, 100, 324, 828, 1825, 8848, 10994, 50000, 560000, 12742000, 40075000, 384400000];
    for (var i = 0; i < milestones.length; i++) {
        if (meters_to_be_compared >= milestones[i]) {
            var icon = document.getElementById("milestone").children;
            var elem = document.createElement("img");
            elem.src = images[i];
            elem.classList.add('Icon');
            icon[i].classList.add('image');
            icon[i].appendChild(elem);
        }
    }
}




var images = [
    'icons/Pisa.svg',
    'icons/Football.svg',
    'icons/EiffelTower.svg',
    'icons/Dubai.svg',
    'icons/Brooklin.svg',
    'icons/Everest.svg',
    'icons/Marianne.svg',
    'icons/Manica.svg',
    'icons/Stratosphere.svg',
    'icons/Diameter.svg',
    'icons/Equator.svg',
    'icons/Moon.svg'
];

var links = [
    'https://en.wikipedia.org/wiki/Leaning_Tower_of_Pisa',
    'https://en.wikipedia.org/wiki/Football_pitch',
    'https://en.wikipedia.org/wiki/Eiffel_Tower',
    'https://en.wikipedia.org/wiki/Burj_Khalifa',
    'https://en.wikipedia.org/wiki/Brooklyn_Bridge',
    'https://en.wikipedia.org/wiki/Mount_Everest',
    'https://en.wikipedia.org/wiki/Mariana_Trench',
    'https://en.wikipedia.org/wiki/English_Channel',
    'https://en.wikipedia.org/wiki/Stratosphere',
    'https://en.wikipedia.org/wiki/Earth_radius',
    'https://en.wikipedia.org/wiki/Equator',
    'https://en.wikipedia.org/wiki/Lunar_distance_(astronomy)'
];



var weblink = document.getElementsByClassName("icon-space");

weblink[0].onmouseover = function() {
    if (weblink[0].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[0])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[0].innerHTML = 'Leaning Tower of Pisa: 56m';
    }
}
weblink[1].onmouseover = function() {
    if (weblink[1].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[1])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[1].innerHTML = 'Football pitch: 100m';
    }
}
weblink[2].onmouseover = function() {
    if (weblink[2].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[2])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[2].innerHTML = 'Eiffel Tower: 324m';
    }
}
weblink[3].onmouseover = function() {
    if (weblink[3].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[3])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[3].innerHTML = 'Burj Khalifa: 828m';
    }
}
weblink[4].onmouseover = function() {
    if (weblink[4].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[4])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[4].innerHTML = 'Brooklyn Bridge: 1825m';
    }
}
weblink[5].onmouseover = function() {
    if (weblink[5].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[5])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[5].innerHTML = 'Mount Everest: 8848m';
    }
}
weblink[6].onmouseover = function() {
    if (weblink[6].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[6])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[6].innerHTML = 'Mariana Trench: 10994m';
    }
}
weblink[7].onmouseover = function() {
    if (weblink[7].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[7])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[7].innerHTML = 'English Channel: 50000m';
    }
}
weblink[8].onmouseover = function() {
    if (weblink[8].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[8])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[8].innerHTML = 'Stratosphere: 560000m';
    }
}
weblink[9].onmouseover = function() {
    if (weblink[9].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[9])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[9].innerHTML = 'Earth Diameter: 12742000m';
    }
}
weblink[10].onmouseover = function() {
    if (weblink[10].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[10])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[10].innerHTML = 'Equator: 40075000m';
    }
}
weblink[11].onmouseover = function() {
    if (weblink[11].classList.contains('image')) {
        this.onclick = function() {
            window.open(links[11])
        }
        this.classList.add('tooltip');
        document.getElementsByClassName("tooltiptext")[11].innerHTML = 'Lunar distance: 384400000m';
    }
}
