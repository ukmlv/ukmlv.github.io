import { highlightSearchTerm } from "./highlight-search-term.js";

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("bibsearch");
  const filterBar = document.getElementById("pub-filters");
  const status = document.getElementById("pub-status");
  const buttons = filterBar ? Array.from(filterBar.querySelectorAll(".pub-filter")) : [];
  const items = Array.from(document.querySelectorAll(".bibliography > li"));

  let searchTerm = ""; // always lowercase
  let currentType = "all";

  // An entry matches a filter button via the data-category / data-award attributes set in _layouts/bib.liquid
  const matchesType = (item, type) => {
    if (type === "all") return true;
    const row = item.querySelector("[data-category]");
    if (!row) return false;
    if (type === "award") return row.dataset.award === "true";
    return row.dataset.category === type;
  };

  // Returns the entries whose text contains the search term, highlighting the matches where supported
  const findTextMatches = () => {
    if (!searchTerm) {
      if (CSS.highlights) CSS.highlights.delete("search");
      return items;
    }
    if (CSS.highlights) {
      const nonMatchingElements = highlightSearchTerm({ search: searchTerm, selector: ".bibliography > li" }) || [];
      return items.filter((item) => nonMatchingElements.indexOf(item) === -1);
    }
    // Simply compare the text if Browser does not support CSS highlights
    return items.filter((item) => item.innerText.toLowerCase().indexOf(searchTerm) !== -1);
  };

  // Hide year headings, lists and whole sections that have no visible entries left
  const hideEmptyGroups = () => {
    document.querySelectorAll("ol.bibliography").forEach((ol) => {
      const empty = ol.querySelector(":scope > li:not(.unloaded)") === null;
      ol.classList.toggle("unloaded", empty);
      const heading = ol.previousElementSibling;
      if (heading && heading.matches("h2.bibliography, h3.bibliography")) {
        heading.classList.toggle("unloaded", empty);
      }
    });
    document.querySelectorAll(".pub-section").forEach((section) => {
      const empty = section.querySelector(".bibliography > li:not(.unloaded)") === null;
      section.classList.toggle("unloaded", empty);
    });
  };

  // actual bibsearch logic: an entry is shown if it matches both the search term and the active filter
  const filterItems = () => {
    const textMatches = findTextMatches();
    let shown = 0;
    items.forEach((item) => {
      const visible = textMatches.indexOf(item) !== -1 && matchesType(item, currentType);
      item.classList.toggle("unloaded", !visible);
      if (visible) shown++;
    });
    hideEmptyGroups();

    // Button counts reflect the current search
    buttons.forEach((button) => {
      const type = button.dataset.filter;
      button.setAttribute("aria-pressed", String(type === currentType));
      button.querySelector("[data-count]").textContent = "(" + textMatches.filter((item) => matchesType(item, type)).length + ")";
    });
    if (status) status.textContent = "Showing " + shown + " of " + items.length + " publications";
  };

  // Keep ?q= and ?type= in sync with the current state, leaving them out when they are the default
  const updateUrl = () => {
    const url = new URL(window.location.href);
    if (searchTerm) url.searchParams.set("q", searchTerm);
    else url.searchParams.delete("q");
    if (currentType !== "all") url.searchParams.set("type", currentType);
    else url.searchParams.delete("type");
    // Drop a legacy #search-term hash so it does not override the new state on reload
    if (url.hash && !document.getElementById(decodeURIComponent(url.hash.substring(1)))) url.hash = "";
    window.history.replaceState(null, "", url);
  };

  // A hash that names an element on the page (e.g. a bib key like #Park.etal2026) is a jump target.
  // Any other hash is treated as a search term, as in the original bibsearch.
  const applyHash = () => {
    const hashValue = decodeURIComponent(window.location.hash.substring(1)); // Remove the '#' character
    if (!hashValue) return;
    const target = document.getElementById(hashValue);
    if (target) {
      const item = target.closest(".bibliography > li");
      if (item && item.classList.contains("unloaded")) {
        // The entry is hidden by the current search or filter: reset so it can be shown
        searchTerm = "";
        currentType = "all";
        input.value = "";
        filterItems();
        updateUrl();
      }
      target.scrollIntoView();
      return;
    }
    searchTerm = hashValue.trim().toLowerCase();
    input.value = hashValue;
    filterItems();
    updateUrl(); // moves the search term from the hash to ?q=
  };

  if (filterBar) filterBar.hidden = false;
  if (status) status.hidden = false;

  // Initial state from the URL: ?q= and ?type=, then the hash
  const params = new URLSearchParams(window.location.search);
  searchTerm = (params.get("q") || "").trim().toLowerCase();
  input.value = params.get("q") || "";
  const typeParam = params.get("type");
  if (buttons.some((button) => button.dataset.filter === typeParam)) currentType = typeParam;
  filterItems();
  applyHash();

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      currentType = this.dataset.filter;
      filterItems();
      updateUrl();
    });
  });

  // Sensitive search. Only start searching if there's been no input for 300 ms
  let timeoutId;
  input.addEventListener("input", function () {
    clearTimeout(timeoutId); // Clear the previous timeout
    const value = this.value.trim().toLowerCase();
    timeoutId = setTimeout(() => {
      searchTerm = value;
      filterItems();
      updateUrl();
    }, 300);
  });

  window.addEventListener("hashchange", applyHash); // Update the filter or jump when the hash changes
});
