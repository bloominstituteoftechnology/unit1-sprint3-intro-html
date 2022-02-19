import { fireEvent, getByText, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fail } from 'assert';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let container;

describe('index.html', () => {
    beforeEach(() => {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        container = dom.window.document.body;
    });

    it('renders a with an external stylesheet', () => {
        const cssLinkTag = dom.window.document.head.querySelector('link[rel="stylesheet"]');
        expect(cssLinkTag).toBeInTheDocument();
    });

    it('renders a header title', () => {
        const headerTitle = container.querySelector('h1').innerHTML;
        const regex = /Sweet Eats Bakery/i;
        expect(headerTitle).toMatch(regex);
    });

    it('renders the correct five links in header nav', () => {
        const headerNavLinks = container.querySelector('header nav');
        let headerNavLinkTextArr = headerNavLinks.innerHTML.split(/<a /i);
        // shift is to get rid of initial index that splits before the a tag
        headerNavLinkTextArr.shift();

        expect(headerNavLinkTextArr.length).toBe(5);

        expect(getByText(headerNavLinks, /About/i)).toBeInTheDocument();
        expect(getByText(headerNavLinks, /Cookies/i)).toBeInTheDocument();
        expect(getByText(headerNavLinks, /Weddings/i)).toBeInTheDocument();
        expect(getByText(headerNavLinks, /Catering/i)).toBeInTheDocument();
        expect(getByText(headerNavLinks, /Contact/i)).toBeInTheDocument();
    });

    it('renders the correct four images in body', () => {
        const expectedImgSrcsArr = [
            "https://tk-assets.lambdaschool.com/bcf76f62-2431-4c22-b466-2e711f3da2b9_ui-i-bakery-main-header.png",
            "https://tk-assets.lambdaschool.com/297378d6-9c89-430f-9d2e-46ae3d5edce8_ui-i-bakery-cupcake-i.png",
            "https://tk-assets.lambdaschool.com/7393a8fd-c8e5-4003-921f-79e0d546d02c_ui-i-bakery-cookies.png", "https://tk-assets.lambdaschool.com/ab0cb095-5900-476c-b042-aea065d3dbbf_ui-i-bakery-celebrate.png"
        ];
        const allImages = Array.from(container.querySelectorAll('img'));
        const allImageSrcs = allImages.map(img => img.src)

        expect(allImages.length).toBe(4);
        expect(allImageSrcs).toEqual(expect.arrayContaining(expectedImgSrcsArr));
    });

    it('renders the correct four subheading h2', () => {
        const h2Arr = container.querySelectorAll('h2');
        expect(h2Arr.length).toBe(5);
    });
    

    it('renders the correct five links in footer nav', () => {
        const footerNavLinks = container.querySelector('footer nav');
        let footerNavLinkTextArr = footerNavLinks.innerHTML.split(/<a /i);
        // shift is to get rid of initial index that splits before the a tag
        footerNavLinkTextArr.shift();

        expect(footerNavLinkTextArr.length).toBe(5);

        expect(getByText(footerNavLinks, /About/i)).toBeInTheDocument();
        expect(getByText(footerNavLinks, /Cookies/i)).toBeInTheDocument();
        expect(getByText(footerNavLinks, /Weddings/i)).toBeInTheDocument();
        expect(getByText(footerNavLinks, /Catering/i)).toBeInTheDocument();
        expect(getByText(footerNavLinks, /Contact/i)).toBeInTheDocument();
    });

    it('renders with semantic address tag', () => {
        const addressTag = container.querySelector('address');
        expect(addressTag).toBeInTheDocument();
    });

    it('renders with semantic section or article tags', () => {
        const sectionTag = container.querySelector('section');
        const articleTag = container.querySelector('article');
        expect((sectionTag || articleTag)).toBeInTheDocument();
    });

    it('renders with at least 4 semantic p tags', () => {
        const pElements = container.querySelectorAll('p');
        expect(pElements.length).toBeGreaterThanOrEqual(4);
    });

});

