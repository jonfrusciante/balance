import { BalancePage } from './app.po';

describe('balance App', function() {
  let page: BalancePage;

  beforeEach(() => {
    page = new BalancePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
