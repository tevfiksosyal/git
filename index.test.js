import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss, isMediaRuleCorrect } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');
const parts = css.split('@media');
const mediaQuery = parts[1];

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('html-0 CSS dosyası sayfaya eklenmiş', () => {
    const cssLinkTag = dom.window.document.head.querySelector(
      'link[href*="index.css"]'
    );
    expect(cssLinkTag).toBeInTheDocument();
  });

  it("html-1 header bölümü'ne div.header-content menüsü eklenmiş", () => {
    const element = container.querySelector('header div.header-content');
    expect(element).toBeInTheDocument();
  });

  it('html-2 header bölümü içine h1 doğru metin ile eklenmiş', () => {
    const element = container.querySelector('header div.header-content h1');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('ERGİNEER MANGAL');
  });

  it("html-3 header-content'e navigasyon menüsü eklenmiş", () => {
    const element = container.querySelector('.header-content nav');
    expect(element).toBeInTheDocument();
  });

  it("html-4 header-content'in sadece 2 child element'i var: h1 ve nav", () => {
    const element = container.querySelector('.header-content').children;
    expect(element.length).toBe(2);
  });

  it('html-5 navigasyon menüsünün içinde 2 adet div var', () => {
    const element = container.querySelector('nav').children;
    expect(element.length).toBe(2);
  });

  it("html-6 navigasyon menüsünün içindeki div'lerin class'ları sırasıyla nav-items ve social-items", () => {
    const element = container.querySelector('nav').children;
    expect(element[0].classList.contains('nav-items')).toBe(true);
    expect(element[1].classList.contains('social-items')).toBe(true);
  });

  it("html-7 navigasyon bölümü'ndeki nav-items'da 4 adet link eklenmiş ve metinleri doğru", () => {
    const element = container.querySelectorAll('.nav-items a');
    expect(element.length).toBe(4);
    expect(element[0].textContent).toMatch(/Menü/i);
    expect(element[1].textContent).toMatch(/Rezervasyonlar/i);
    expect(element[2].textContent).toMatch(/Teklifler/i);
    expect(element[3].textContent).toMatch(/İletişim/i);
  });

  it("html-8 navigasyon bölümü'ndeki nav-items'da 4 adet link eklenmiş ve metinleri doğru", () => {
    const element = container.querySelectorAll('.social-items i');
    expect(element.length).toBe(3);
    expect(element[0].classList.contains('fa-facebook')).toBe(true);
    expect(element[1].classList.contains('fa-twitter')).toBe(true);
    expect(element[2].classList.contains('fa-instagram')).toBe(true);
  });

  it("css-1 header'da background-image, background-size, position, repeat gibi ayarlar yapılmış.", () => {
    expect(
      isPropertySetInCss(
        css,
        'header',
        'background-image',
        "url('https://i.ibb.co/bFJ0jG2/home-header-md.jpg')"
      )
    ).toBe(true);
    expect(isPropertySetInCss(css, 'header', 'background-size', 'cover')).toBe(
      true
    );
    expect(
      isPropertySetInCss(css, 'header', 'background-position', 'center')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, 'header', 'background-repeat', 'no-repeat')
    ).toBe(true);
  });

  it("css-2 nav içindeki i'ler için font-size ana font'un 3 katı ayarlanmış.", () => {
    expect(isPropertySetInCss(css, 'navi', 'font-size', '3rem')).toBe(true);
  });

  it("css-3 header'daki nav için istenenler ayarlanmış.", () => {
    expect(isPropertySetInCss(css, 'headernav', 'display', 'flex')).toBe(true);
    expect(
      isPropertySetInCss(css, 'headernav', 'flex-direction', 'column')
    ).toBe(true);
    expect(isPropertySetInCss(css, 'headernav', 'align-items', 'center')).toBe(
      true
    );
    expect(isPropertySetInCss(css, 'headernav', 'gap', '1rem')).toBe(true);
  });

  it('css-4 nav-items için istenenler flex özellikleri ile ayarlanmış.', () => {
    expect(isPropertySetInCss(css, '.nav-items', 'display', 'flex')).toBe(true);
    expect(
      isPropertySetInCss(css, '.nav-items', 'justify-content', 'center')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.nav-items', 'gap', '2rem')).toBe(true);
  });

  it('css-5 media query maks genişlik 500px için ayarlanmış', () => {
    expect(isMediaRuleCorrect(mediaQuery, 'max-width', '500px')).toBe(true);
  });

  it('css-6 responsive için body tag ayarları yapılmış', () => {
    expect(isPropertySetInCss(mediaQuery, 'body', 'min-width', '350px')).toBe(
      true
    );
    expect(isPropertySetInCss(mediaQuery, 'body', 'text-align', 'center')).toBe(
      true
    );
    expect(isPropertySetInCss(mediaQuery, 'body', 'color', 'black')).toBe(true);
  });

  it('css-7 responsive için .nav-items ayarları yapılmış', () => {
    expect(
      isPropertySetInCss(mediaQuery, '.nav-items', 'flex-direction', 'column')
    ).toBe(true);
    expect(
      isPropertySetInCss(mediaQuery, '.nav-items', 'align-content', 'center')
    ).toBe(true);
    expect(isPropertySetInCss(mediaQuery, '.nav-items', 'gap', '1rem')).toBe(
      true
    );
    expect(
      isPropertySetInCss(mediaQuery, '.nav-items', 'margin', '2rem 0')
    ).toBe(true);
  });
});
