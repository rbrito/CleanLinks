describe('cleanLink', function() {
	it('should clean the link to the target in path', done =>
	{
		expect(cleanLink('http://www.foobar.com/track=ftp://gnu.org')).to.equal('ftp://gnu.org/');
		done();
	});
	it('should clean the link to the base 64 encoded URL', done =>
	{
		expect(cleanLink('http://example.com/aHR0cDovL3d3dy5nb29nbGUuY29t?arg=val')).to.equal('http://www.google.com/');
		done();
	});
	it('should clean the link to the simple javascript function argument', done =>
	{
		expect(cleanLink("javascript:window.open('http://somesite.com/')")).to.equal('http://somesite.com/');
		done();
	});
	it('should clean the link to the complex javascript function argument', done =>
	{
		expect(cleanLink("javascript:func(\"arg1\", 'arg2', 'http://somesite.com', 'target=\"_self\"')")).to.equal('http://somesite.com/');
		done();
	});
	it('should clean the link to the javascript function relative path argument', done =>
	{
		expect(cleanLink("javascript:displayWindowzdjecie('/_misc/zdj_wym.php?url_zdjecie=https://static2.s-trojmiasto.pl/zdj/c/n/9/2079/1100x0/2079199-Wizualizacja-obrotowej-kladki-Sw-Ducha.jpg',1100,778);"))
			.to.equal('https://static2.s-trojmiasto.pl/zdj/c/n/9/2079/1100x0/2079199-Wizualizacja-obrotowej-kladki-Sw-Ducha.jpg');
		done();
	});
	it('should clean the link to the URL-encoded URL in parameters', done =>
	{
		expect(cleanLink('https://l.messenger.com/l.php?u=https%3A%2F%2Fwww.airbnb.co.uk%2Frooms%2F123456789&h=ATO7e0WkmJSY2jU_U6fyz6-MmwWZvfV4NAQwuaK1aB9QwmXdOZuHbPceKl8FCqHYTbEpoSWufsOmj36S4K0DI6BLpuIyGoRK_OcE5UHyPnY'))
			.to.equal('https://www.airbnb.co.uk/rooms/123456789');
		done();
	});
	it('should clean the link to the Doubly encoded URL in path and parameters', done =>
	{
		expect(cleanLink('http://two.level.redir.ect/https%3A%2F%2Fl.messenger.com%2Fl.php%3Fu%3Dhttps%253A%252F%252Fwww.airbnb.co.uk%252Frooms%252F123456789%26h%3DATO7e0WkmJSY2jU_U6fyz6-MmwWZvfV4NAQwuaK1aB9QwmXdOZuHbPceKl8FCqHYTbEpoSWufsOmj36S4K0DI6BLpuIyGoRK_OcE5UHyPnY'))
			.to.equal('https://www.airbnb.co.uk/rooms/123456789');
		done();
	});
	it('should preserve a link without redirects', done =>
	{
		let link = 'https://assets-cdn.github.com/assets/frameworks-95aff0b550d3fe338b645a4deebdcb1b.css'
		expect(cleanLink(link)).to.equal(link);
		done();
	});
	it('should strip the utm parameters', done =>
	{
		expect(cleanLink('https://www.aboutamazon.com/?keep=this&utm_source=gateway&utm_medium=footer'))
			.to.equal('https://www.aboutamazon.com/?keep=this');
		done();
	});
	it('should manage fb mobile URLs with all the path in the hash', done =>
	{
		let link = 'https://m.facebook.com/home.php#!/photo.php?fbid=1234567890&id=1234567890&set=a.1234567890&source=1234567890&refid=1234567890&_ft_=qid.1234567890%1234567890Amf_story_key.1234567890%1234567890Aog_action_id.1234567890%1234567890Atop_level_post_id.1234567890%1234567890Asrc.1234567890%1234567890Aphoto_id.1234567890&__tn__=EH-R'
		expect(cleanLink(link)).to.equal(link);
		done();
	});
});
