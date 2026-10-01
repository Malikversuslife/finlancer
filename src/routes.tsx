import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Invoicing from './pages/Invoicing'
import Money from './pages/Money'
import Tax from './pages/Tax'
import Goals from './pages/Goals'
import Intelligence from './pages/Intelligence'
import Pricing from './pages/Pricing'
import Resources from './pages/Resources'
import About from './pages/About'
import { Help, Privacy, Terms, Contact, NotFound } from './pages/Simple'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'product', Component: Product },
      { path: 'invoicing', Component: Invoicing },
      { path: 'money', Component: Money },
      { path: 'tax', Component: Tax },
      { path: 'goals', Component: Goals },
      { path: 'intelligence', Component: Intelligence },
      { path: 'pricing', Component: Pricing },
      { path: 'resources', Component: Resources },
      { path: 'about', Component: About },
      { path: 'help', Component: Help },
      { path: 'privacy', Component: Privacy },
      { path: 'terms', Component: Terms },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
])
