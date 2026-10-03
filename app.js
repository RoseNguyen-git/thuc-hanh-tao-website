(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var IMG = "images/";

  /* ---------- render content ---------- */
  $("#timeline").innerHTML = S.story.map(function (s) {
    return '<li class="tl reveal"><div class="tl__img"><img src="' + IMG + s.img + '" alt="' + esc(s.alt) + '" loading="lazy" width="1122" height="1402"></div>' +
      '<div class="tl__txt"><div class="tl__year">' + esc(s.year) + '</div><p class="tl__en">' + esc(s.en) + '</p><p class="tl__vi">' + esc(s.vi) + '</p></div></li>';
  }).join("");

  var flat = [];
  $("#galleryGroups").innerHTML = S.gallery.map(function (g) {
    return '<div class="g-group reveal"><h3>' + esc(g.group) + '</h3><div class="g-grid">' + g.items.map(function (it) {
      var i = flat.push(it) - 1;
      return '<button class="g-item' + (it.wide ? " wide" : "") + '" data-i="' + i + '" aria-label="Phóng to: ' + esc(it.alt) + '"><img src="' + IMG + it.img + '" alt="' + esc(it.alt) + '" loading="lazy"></button>';
    }).join("") + "</div></div>";
  }).join("");

  $("#info4").innerHTML = S.weddingInfo.map(function (w) {
    return "<li><b>" + esc(w.time) + "</b><span>" + esc(w.label) + "</span></li>";
  }).join("");

  $("#schedule").innerHTML = S.schedule.map(function (s) {
    return '<li class="sch reveal"><time>' + esc(s.time) + "</time><div><h3>" + esc(s.en) + "</h3><p>" + esc(s.vi) + "</p></div></li>";
  }).join("");

  $("#hl").innerHTML = S.highlights.map(function (h) {
    return '<article class="hl-card reveal' + (h.img ? "" : " hl-card--text") + '">' + (h.img ? '<img src="' + IMG + h.img + '" alt="" loading="lazy">' : "") +
      "<div><h3>" + esc(h.en) + "</h3><p>" + esc(h.vi) + "</p></div></article>";
  }).join("");

  $("#dressStyle").textContent = S.dressCode.style;
  $("#dressDesc").textContent = S.dressCode.desc;
  $("#swatches").innerHTML = S.dressCode.colors.map(function (c) {
    return '<li><i style="background:' + c.hex + '"></i>' + esc(c.name) + "</li>";
  }).join("");

  var v = S.venue;
  $("#venueName").textContent = v.name;
  $("#venueArea").textContent = v.area;
  $("#venueArrival").textContent = v.arrival;
  $("#venueRec").textContent = v.recommend;
  if (v.address) { $("#venueAddr").textContent = v.address; $("#venueAddrRow").hidden = false; }
  $("#mapBtn1").href = v.mapsUrl; $("#mapBtn2").href = v.mapsUrl;

  $("#faqList").innerHTML = S.faq.map(function (f) {
    var a = f.pending ? "<em>Thông tin này sẽ được cập nhật sớm. Nếu cần biết ngay, bạn vui lòng liên hệ trực tiếp Hà Vy &amp; Thanh An.</em>" : esc(f.a);
    return "<details><summary>" + esc(f.q) + '</summary><div class="a">' + a + "</div></details>";
  }).join("");

  if (S.gifts && S.gifts.enabled) {
    $("#gifts").hidden = false;
    $("#gBank").textContent = S.gifts.bank; $("#gName").textContent = S.gifts.accountName; $("#gNum").textContent = S.gifts.accountNumber;
    if (S.gifts.qrImage) { var q = $("#gQr"); q.src = S.gifts.qrImage; q.hidden = false; }
    $("#gCopy").addEventListener("click", function () {
      var b = this;
      (navigator.clipboard ? navigator.clipboard.writeText(S.gifts.accountNumber) : Promise.reject()).then(function () { b.textContent = "Copied"; }, function () { b.textContent = "Chọn & copy thủ công"; });
    });
  }

  /* ---------- nav ---------- */
  var nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
  function navState() { nav.classList.toggle("solid", window.scrollY > 40 || links.classList.contains("open")); }
  window.addEventListener("scroll", navState, { passive: true }); navState();
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open); toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu"); navState();
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", function () { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); navState(); }); });

  /* ---------- reveal + timeline line ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add("in"); }); }

  var tl = $("#timeline");
  function tlProgress() {
    var r = tl.getBoundingClientRect(), h = window.innerHeight;
    var p = Math.min(1, Math.max(0, (h * 0.7 - r.top) / r.height));
    tl.style.setProperty("--p", p.toFixed(3));
  }
  window.addEventListener("scroll", tlProgress, { passive: true }); tlProgress();

  /* ---------- countdown ---------- */
  var target = new Date(S.countdownTo).getTime(), cd = $("#countdown");
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function tick() {
    var d = target - Date.now();
    if (d <= 0) {
      cd.hidden = true;
      var done = $("#countdownDone"); done.hidden = false;
      done.textContent = Date.now() - target < 864e5 ? "Hôm nay là ngày cưới." : "Cảm ơn bạn đã cùng chúng tôi.";
      clearInterval(timer); return;
    }
    $('[data-u="d"]').textContent = pad(Math.floor(d / 864e5));
    $('[data-u="h"]').textContent = pad(Math.floor(d / 36e5) % 24);
    $('[data-u="m"]').textContent = pad(Math.floor(d / 6e4) % 60);
    $('[data-u="s"]').textContent = pad(Math.floor(d / 1e3) % 60);
  }
  var timer = setInterval(tick, 1000); tick();

  /* ---------- calendar ---------- */
  function utc(s) { return new Date(s).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  var ev = S.event, loc = v.name + (v.address ? ", " + v.address : ", " + v.area.replace(" · ", ", "));
  var gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title) +
    "&dates=" + utc(ev.start) + "/" + utc(ev.end) + "&location=" + encodeURIComponent(loc) +
    "&details=" + encodeURIComponent("Lễ cưới 17:30 · Tiệc tối 18:30 · Tiệc mừng 20:30. Khách nên có mặt trước 17:10.");
  $("#calGoogle").href = gcal; $("#thanksGoogle").href = gcal;
  var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//HaVy-ThanhAn//Wedding//VI", "BEGIN:VEVENT",
    "UID:wedding-20261010@havy-thanhan", "DTSTAMP:" + utc(new Date().toISOString()),
    "DTSTART:" + utc(ev.start), "DTEND:" + utc(ev.end), "SUMMARY:" + ev.title.replace(/,/g, "\\,"),
    "LOCATION:" + loc.replace(/,/g, "\\,"), "DESCRIPTION:Lễ cưới 17:30 · Tiệc tối 18:30 · Tiệc mừng 20:30",
    "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  $("#calIcs").href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
  var calBtn = $("#calBtn"), calMenu = $("#calMenu");
  calBtn.addEventListener("click", function (e) { e.stopPropagation(); calMenu.hidden = !calMenu.hidden; calBtn.setAttribute("aria-expanded", !calMenu.hidden); });
  document.addEventListener("click", function () { calMenu.hidden = true; calBtn.setAttribute("aria-expanded", "false"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") calMenu.hidden = true; });

  /* ---------- lightbox ---------- */
  var lb = $("#lb"), lbImg = $("#lbImg"), cur = 0;
  function show(i) { cur = (i + flat.length) % flat.length; lbImg.src = IMG + flat[cur].img; lbImg.alt = flat[cur].alt; }
  $("#galleryGroups").addEventListener("click", function (e) {
    var b = e.target.closest(".g-item"); if (!b) return;
    show(+b.dataset.i); if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
  });
  $("#lbX").addEventListener("click", function () { lb.close(); });
  $("#lbP").addEventListener("click", function () { show(cur - 1); });
  $("#lbN").addEventListener("click", function () { show(cur + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
  var sx = 0;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); });

  /* ---------- RSVP ---------- */
  var form = $("#rsvpForm"), statusEl = $("#status"), yesF = $("#yesFields"), thanks = $("#thanks");
  var KEY = "rsvp:v1", QKEY = "rsvp:queue";

  var dl = new Date(S.rsvpDeadline + "T23:59:59+07:00"), dlTxt = S.rsvpDeadline.split("-").reverse().join(".");
  $("#rsvpDeadline").textContent = Date.now() > dl.getTime()
    ? "Hạn phản hồi là " + dlTxt + ". Nếu chưa gửi, bạn vui lòng phản hồi sớm nhất có thể."
    : "Vui lòng phản hồi trước " + dlTxt + ".";

  function toggleYes() {
    var no = (form.attending.value === "no");
    yesF.hidden = no;
  }
  $$('input[name="attending"]', form).forEach(function (r) { r.addEventListener("change", toggleYes); });

  function fill(d) {
    form.name.value = d.name || "";
    if (d.attending) { var r = $('input[name="attending"][value="' + d.attending + '"]', form); if (r) r.checked = true; }
    form.guests.value = d.guests || "1"; form.meal.value = d.meal || "Standard";
    form.allergy.value = d.allergy || ""; form.song.value = d.song || ""; form.message.value = d.message || "";
    toggleYes();
  }
  function showThanks(d, sent) {
    form.hidden = true; thanks.hidden = false;
    $("#thanksSub").textContent = d.attending === "no"
      ? "Rất tiếc bạn không thể đến. Chúng tôi vẫn cảm ơn lời nhắn của bạn."
      : (sent ? "Chúng tôi đã nhận được phản hồi của bạn." : "Phản hồi của bạn đã được lưu trên thiết bị này.");
    if (d.attending === "no") $("#thanksGoogle").hidden = true; else $("#thanksGoogle").hidden = false;
    thanks.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  var saved = store.get(KEY);
  if (saved) {
    fill(saved);
    var r = $("#returning"); r.hidden = false;
    r.textContent = "Chúng tôi đã nhận phản hồi của " + saved.name + " (" + (saved.attending === "yes" ? "tham dự" : "không tham dự") + "). Bạn có thể chỉnh sửa và gửi lại bên dưới.";
  }
  $("#editRsvp").addEventListener("click", function () { thanks.hidden = true; form.hidden = false; form.scrollIntoView({ block: "start", behavior: "smooth" }); });

  function post(payload) {
    if (!S.endpoint) return Promise.resolve(false);
    return fetch(S.endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) }).then(function () { return true; });
  }
  function flush() {
    var q = store.get(QKEY) || []; if (!q.length || !S.endpoint || !navigator.onLine) return;
    store.set(QKEY, []);
    q.forEach(function (p) { post(p).catch(function () { var n = store.get(QKEY) || []; n.push(p); store.set(QKEY, n); }); });
  }
  window.addEventListener("online", flush); flush();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.website.value) return; // honeypot
    var name = form.name.value.trim(), att = form.attending.value, ok = true;
    $$(".err", form).forEach(function (n) { n.textContent = ""; });
    $$(".field", form).forEach(function (n) { n.classList.remove("invalid"); });
    if (!name) { $('[data-for="name"]').textContent = "Vui lòng nhập họ tên."; form.name.closest(".field").classList.add("invalid"); ok = false; }
    if (!att) { $('[data-for="attending"]').textContent = "Vui lòng chọn một đáp án."; ok = false; }
    if (!ok) { var f = $(".invalid input, .err:not(:empty)", form); if (f && f.scrollIntoView) f.scrollIntoView({ block: "center", behavior: "smooth" }); return; }

    var yes = att === "yes";
    var d = {
      name: name, attending: att,
      guests: yes ? form.guests.value : "0", meal: yes ? form.meal.value : "",
      allergy: yes ? form.allergy.value.trim() : "", song: yes ? form.song.value.trim() : "",
      message: form.message.value.trim(), submittedAt: new Date().toISOString()
    };
    store.set(KEY, d);
    var btn = $("#submitBtn"); btn.disabled = true; btn.textContent = "Sending…"; statusEl.textContent = "";
    post(d).then(function (sent) { showThanks(d, sent); }, function () {
      var q = store.get(QKEY) || []; q.push(d); store.set(QKEY, q);
      showThanks(d, false);
      $("#thanksSub").textContent = "Mạng đang gián đoạn — phản hồi đã được lưu và sẽ tự động gửi lại khi có kết nối.";
    }).then(function () { btn.disabled = false; btn.textContent = "Send RSVP"; });
  });
})();
