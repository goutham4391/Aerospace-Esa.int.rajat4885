
function add_article_grid(a) {
var dti = new Date(a.date * 1000).toISOString();
var dt = dti.slice(0, 10) + ' ' + dti.slice(11, 16);
var ord = dt + ' - ' + a.priority + ' - ' + a.nodeid;
var s, nw, stitle;
if (a.nw && a.nw == '1') {
nw = ' target="_blank"';
} else
nw = ''
if (a.title.length > 55)
stitle = a.title.substring(0, 54) + '…';
else
stitle = a.title;
if (a.alias == 'about_paxi') {
s =
'<div class="grid-item size-hor paxi-box"><a href="' + a.url + '" class="entry">' +
'<div class="floater"><img src="/extension/kids/design/kids/images/floater-paxi.svg" class="floater-paxi" data-stellar-ratio="0.5"></div>' +
'<div class="who-is-paxi"></div><div class="pattern" data-stellar-background-ratio="0.8"></div>' +
'</a></div>';
kids.stellar = 1;
} else if (a.size == 'action') {
s  =
'<div class="grid-item ' + a.alias + ' ' + a.category + '"><div class="entry action-box"><div class="content">' +
'<div class="icon"><img src="/extension/kids/design/kids/images/' + a.icon + '-b.svg"></div>' +
'<div class="entry-text"><h2 title="' + a.title + '">' + stitle + '</h2></div>' +
'<div class="entry-action"><a href="' + a.url + '"' + nw + ' class="btn">Apply here</a></div>' +
'</div></div></div>';
} else {
s  =
'<div class="grid-item ' + a.size + ' ' + a.alias + ' ' + a.category + '"><a href="' + a.url + '"' + nw + ' class="entry media-box"><div class="content">' +
'<div class="icon"><img src="/extension/kids/design/kids/images/' + a.icon + '-e.svg"></div>' +
'<div class="entry-text"><h2 title="' + a.title + '">' + stitle + '</h2><!--' + ord + ' --></div>' +
'<div class="more"><i class="material-icons">add_circle_outline</i></div><div class="pattern"></div>' +
'</div><div class="thumbnail" style="background-image: url(' + a.image + ')"></div></a></div>';
}
return s;
}
kids.step = 10;
kids.loaded = '';
kids.filter = 'a' + kids.alias + '_' + kids.la;
var grid;
$(function() {
jQuery.get('/kids/articles/s2',
{'la': kids.la, 'al': kids.alias, 'n': 20}, fill_articles, 'json');
});
function add_sections_buttons() {
var i, j, s, h;
$('#filters').append('<button id="' + kids.filter + '" class="btn active">' + kids.all + '</button>');
for (i = 0; i < kids.sections.length; i++) {
s = '<button id="' + kids.sections[i].a + '" class="btn">' + kids.sections[i].s + '</button>\n';
$('#filters').append(s);
h = '<div class="filters subfilters ' + kids.sections[i].a + '">\n';
for (j = 0; j < kids.sections[i].c.length; j++) {
h += '<button id="' + kids.sections[i].c[j].a + '" class="btn">' + kids.sections[i].c[j].s + '</button>\n';
}
h += '</div>\n';
$('#subfilters').append(h);
}
};
function fill_articles(resp, status) {
kids.sections = resp.sections;
add_sections_buttons();
var s, i;
for (i = 0; i < resp.articles.length; i++) {
s = add_article_grid(resp.articles[i]);
$('#articles-grid').append(s);
kids.loaded += '-' + resp.articles[i].nodeid;
}
grid = $('.grid').isotope({
itemSelector: '.grid-item',
stagger: 50,
masonry: {
columnWidth: '.grid-sizer',
gutter: 0
}
});
if (resp.e)
finito(resp.e);
else
$('.load-more button').click(function() {
var sa = kids.loaded.substring(1);
console.log('sending sa ' + sa);
jQuery.get('/kids/articles/s3',
{'an': kids.filter, 'sa': sa, 'n': kids.step}, more_articles, 'json');
}).show();
$('.filters button').click(function() {
var id = this.id;
var filterValue = '';
if (id.charAt(0) == 's')
filterValue = '.' + id;
grid.isotope({ filter: filterValue });
kids.filter = id;
console.log('clicked button #' + id + ' end:' + $(this).attr('data-end'));
if ($(this).attr('data-end'))
$('.load-more button').hide();
else
$('.load-more button').show();
});
$('#filters button').click(function() {
$('.subfilters').removeClass('open');
$('.' + this.id).addClass('open');
$('.filters button').removeClass('active');
$(this).addClass('active');
});
$('#subfilters button').click(function() {
$('#subfilters button').removeClass('active');
$(this).addClass('active');
});
var q, p, j
if (q = window.location.search) {
p = q.substring(1).split('../../index.html');
if (p[0]) {
console.log('detected p0 ' + p[0]);
for (i = 0; i < kids.sections.length; i++) {
if (kids.sections[i].a == p[0]) {
$('#' + p[0]).trigger('click');
console.log('clicca p0 ' + p[0]);
if (p[1]) {
console.log('detected p1 ' + p[1]);
for (j = 0; j < kids.sections[i].c.length; j++) {
if (kids.sections[i].c[j].a == p[1]) {
$('#' + p[1]).trigger('click');
console.log('clicca p1 ' + p[1]);
}
}
}
}
}
}
}
};
function more_articles(resp, status) {
var a, i;
for (i = 0; i < resp.articles.length; i++) {
a = $.parseHTML(add_article_grid(resp.articles[i]));
grid.isotope()
.append(a)
.isotope('appended', a)
.isotope('layout');
kids.loaded += '-' + resp.articles[i].nodeid;
}
if (resp.e)
finito(resp.e);
}
function finito(e) {
$('.load-more button').hide();
console.log('finito ' + e + ' corrente ' + kids.filter);
if (e.charAt(0) == 'a') {
console.log('tutto finito');
$('.filters button').attr('data-end', '1');
} else {
$('#' + e).attr('data-end', '1');
$('.subfilters.' + e + ' button').attr('data-end', '1');
}
}
