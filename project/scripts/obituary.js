

// --------------- Nav bar ------------------
navLinks = ["Obituary", "Guest Book", "Memorial Events"]

function getWidth() {
    return window.innerWidth || document.documentElement.clientWidth || screen.width;
}

function populateNavPanel(panel) {

    panel.innerHTML = '';
    const navBar = document.createElement("nav")
    navBar.className = "nav-bar"
    for (const label of navLinks) {
        const slugBase = String(label || '');
        const linkNav = slugBase.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        const nav = document.createElement("a");
        nav.textContent = label;
        nav.href = `${linkNav}.html`;
        nav.className = "nav-link";
        navBar.appendChild(nav);


    }
    panel.appendChild(navBar)

}

function renderNav() {
    const topPanel = document.querySelector(".top-panel")
    const bottomPanel = document.querySelector(".bottom-panel")
    const width = getWidth()


    if (!topPanel && !bottomPanel) return;

    if (width > 600) {
        if (topPanel) populateNavPanel(topPanel);
        if (bottomPanel) bottomPanel.innerHTML = '';
    } else {
        if (bottomPanel) populateNavPanel(bottomPanel);
        if (topPanel) topPanel.innerHTML = '';
    }

}


// simple debounce to avoid spamming on resize
function debounce(fn, wait = 150) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}




// -----------------Guest book entries--------------------- 

class Entry {
    constructor(user, comment, date,) {
        this.user = user;
        this.comment = comment;
        this.date = date;
    }
}

let entries = [new Entry("Maria Thompson", "Charlie had a warm smile and a generous heart. He will be missed by all who knew him.", "10/05/2025"),
new Entry("James Lee", "Rest in peace. Thank you for the kindness you showed throughout your life.", "09/28/2025"),
new Entry("Anita Gomez", "My deepest condolences to the family. I'll always remember the laughter and stories we shared.", "09/12/2025")]

function constructGuestBookEntry(userName, currentDate, userComment) {

    const entry = document.createElement("div");
    entry.className = "guest-book-entry"


    const name = document.createElement("p")
    name.className = "user-name"
    name.textContent = userName

    const date = document.createElement("p")
    date.className = "guest-book-entry-date"
    date.textContent = currentDate

    const comment = document.createElement("p")
    comment.textContent = userComment

    const profileInfo = document.createElement("div")
    profileInfo.className = "profile-info"
    profileInfo.appendChild(name)
    profileInfo.appendChild(date)
    entry.appendChild(profileInfo)
    entry.appendChild(comment)


    return entry;

}


function renderGuestBookEntries() {
    const container = document.querySelector(".guest-book-entries");
    if (!container) return;
    container.innerHTML = '';

    loadEntriesFromStorage();

    for (const e of entries) {
        const el = constructGuestBookEntry(e.user, e.date, e.comment)
        container.appendChild(el)
    }
}

function addGuestBookEntry(userName, userComment, dateStr = null) {

    if (!Array.isArray(entries) || entries.length === 0) {
        loadEntriesFromStorage();
    }

    const d = dateStr || new Date().toLocaleDateString();
    const newEntry = new Entry(userName, userComment, d)
    entries.unshift(newEntry)
    saveEntriesToStorage();
    renderGuestBookEntries();
}


const STORAGE_KEY = 'guestbook_v1'

function saveEntriesToStorage() {
    try {
        // store plain objects (avoid class-instance surprises)
        const plain = entries.map(e => ({ user: e.user, comment: e.comment, date: e.date }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plain))
    } catch (err) {
        console.warn('Could not save guest book to localStorage', err)
    }
}

function loadEntriesFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return false;

        entries = parsed.map(obj => new Entry(obj.user ?? 'Anonymous', obj.comment ?? '', obj.date ?? new Date().toLocaleDateString()))
        return true
    } catch (err) {
        console.warn('Failed to parse guestbook from localStorage', err);
        return false;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderGuestBookEntries();

    // Listener on form to add new entries to the guest book
    const form = document.querySelector('.guest-book-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const name = form.querySelector('#user-name')?.value?.trim() || 'Anonymous';
            const comment = form.querySelector('#comment')?.value?.trim() || '';
            if (!comment) return;
            addGuestBookEntry(name, comment);
            form.reset();
        });

    }
});
window.addEventListener('resize', debounce(renderNav, 50));
