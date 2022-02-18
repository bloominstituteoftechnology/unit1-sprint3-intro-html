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
    
});

