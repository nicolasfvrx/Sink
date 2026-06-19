// Configuration model for the LittleLink-style home page (app/config/littlelink.json)

export interface LittleLinkItem {
  /** Button text */
  label: string
  /** Destination URL */
  url: string
  /**
   * Brand key. Used to derive both the button color and the icon when
   * `color` / `icon` are not set. e.g. "github", "spotify", "telegram".
   */
  brand?: string
  /**
   * Button color style. Maps to LittleLink's `button-{color}` class.
   * Overrides the value derived from `brand`. e.g. "github", "x", "faceb".
   */
  color?: string
  /**
   * Icon file name (without extension) under /littlelink/icons/.
   * Overrides the value derived from `brand`. e.g. "github", "generic-email".
   */
  icon?: string
  /**
   * Set to true for LittleLink Extended brands, whose icons live under
   * /littlelink/icons-extended/. e.g. "deezer", "codeberg", "bereal".
   */
  extended?: boolean
}

/** A section separator/heading used to group links (e.g. "Affiliate links"). */
export interface LittleLinkSection {
  /** Section title rendered as a heading above the following links */
  section: string
}

/** An entry in the `links` list: either a link button or a section heading. */
export type LittleLinkEntry = LittleLinkItem | LittleLinkSection

export interface LittleLinkConfig {
  /** Document <title> (defaults to `name`) */
  title?: string
  /** Meta description */
  description?: string
  /** Avatar image path (under /public). Empty string hides the avatar. */
  avatar?: string
  /** Avatar rounding style */
  avatarShape?: 'rounded' | 'soft' | 'none'
  /** Display name (H1) */
  name: string
  /** Short bio shown under the name */
  bio?: string
  /** The list of entries (links and section headings), rendered in order */
  links: LittleLinkEntry[]
  /** Optional footer HTML/text */
  footer?: string
}
