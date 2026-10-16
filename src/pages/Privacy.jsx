import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import './Privacy.css'

const UPDATED = 'October 2026'

const Privacy = () => {
  usePageTitle('Privacy & terms')

  return (
    <div className="privacy-page grid-paper">
      <div className="container">
        <article className="privacy-card">
          <h1>Privacy &amp; terms</h1>
          <p className="privacy-updated">Last updated {UPDATED}</p>

          <p>
            Quirky Fruity is a portfolio project. It is not a real shop, so no drinks are made and
            no money is taken. This page explains what happens to the details you type in.
          </p>

          <h2>What is saved</h2>
          <p>
            When you place an order, the site saves your name, phone number, email, address (for
            delivery) and the items you ordered. Your cart is saved too, so it is still there after
            a refresh.
          </p>

          <h2>Where it is saved</h2>
          <p>
            Everything is stored in your own browser using localStorage. There is no server or
            database behind this site, so your details are never sent anywhere and nobody else can
            see them, including me.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            The site does not use cookies, analytics or ads. The only storage it uses is the cart
            and order history described above, which the site needs to work.
          </p>

          <h2>Deleting your data</h2>
          <p>
            Clear this site's data in your browser settings (or use a private window) and your cart
            and orders are gone. The newsletter form doesn't store or send your email.
          </p>

          <h2>Terms</h2>
          <ul>
            <li>Orders placed here are not real and won't be prepared or delivered.</li>
            <li>Prices, opening hours and the address are made up for the demo.</li>
            <li>Please don't enter real card details. The site never asks for them.</li>
            <li>
              The code is open source under the MIT license. You can find it on{' '}
              <a
                href="https://github.com/MuhammadMuneeb-Mk/quirky-fruity"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions about this project can go to{' '}
            <a href="https://github.com/MuhammadMuneeb-Mk" target="_blank" rel="noreferrer">
              Muhammad Muneeb Khan on GitHub
            </a>
            .
          </p>

          <p className="privacy-back">
            <Link to="/menu">Back to the menu</Link>
          </p>
        </article>
      </div>
    </div>
  )
}

export default Privacy
