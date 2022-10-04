
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
var grid;
$(function() {
jQuery.get('/kids/articles/a2',
{'la': kids.la, 'al': kids.alias, 'n': kids.step}, fill_articles, 'json');
});
function fill_articles(resp, status) {
var s, i;
for (i = 0; i < resp.articles.length; i++) {
s = add_article_grid(resp.articles[i]);
$('#articles-grid').append(s);
}
grid = $('.grid').isotope({
itemSelector: '.grid-item',
stagger: 50,
masonry: {
columnWidth: '.grid-sizer',
gutter: 0
}
});
if (kids.stellar) {
$.stellar(stellar_config);
console.log('stellar for paxi');
}
if (!resp.e) {
kids.offset = resp.step;
$('.load-more button').click(function() {
console.log('clicked more, offset ' + kids.offset);
jQuery.get('/kids/articles/a2',
{'offset': kids.offset, 'la': kids.la, 'al': kids.alias, 'n': kids.step}, more_articles, 'json');
}).show();
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
}
if (resp.e) {
$('.load-more button').hide();
} else
kids.offset += kids.step;
}
