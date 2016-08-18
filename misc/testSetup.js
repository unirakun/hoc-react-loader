import { jsdom } from 'jsdom'
import chai from 'chai'
import spies from 'chai-spies'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator

/** Configuring chai. */
chai.should()
chai.config.includeStack = true
chai.config.truncateThreshold = 0
chai.use(spies)
