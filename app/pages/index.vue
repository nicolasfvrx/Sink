<script setup lang="ts">
import type { LittleLinkConfig, LittleLinkEntry, LittleLinkItem, LittleLinkSection } from '@/types/littlelink'
import config from '@/config/littlelink.json'

// Standalone page: skip Sink's default marketing layout.
definePageMeta({ layout: false })

const profile = config as LittleLinkConfig

function isSection(entry: LittleLinkEntry): entry is LittleLinkSection {
  return 'section' in entry
}

// A few brand keys whose button-color class or icon file differ from the key.
const BRAND_ALIASES: Record<string, { color?: string, icon?: string }> = {
  facebook: { color: 'faceb' },
  linkedin: { color: 'linked' },
  tumblr: { color: 'tumb' },
  youtube: { color: 'yt' },
  twitter: { color: 'x', icon: 'x' },
}

function resolveColor(item: LittleLinkItem): string {
  return item.color ?? (item.brand && BRAND_ALIASES[item.brand]?.color) ?? item.brand ?? 'default'
}

function resolveIcon(item: LittleLinkItem): string | null {
  const name = item.icon ?? (item.brand && BRAND_ALIASES[item.brand]?.icon) ?? item.brand
  if (!name)
    return null
  // Explicit path or URL (custom icons, any extension/folder) used as-is.
  if (name.startsWith('http') || name.startsWith('/'))
    return name
  const dir = item.extended ? 'icons-extended' : 'icons'
  return `/littlelink/${dir}/${name}.svg`
}

// Load the complete, original LittleLink stylesheets (served from /public).
// `theme-auto` makes LittleLink follow the browser's light/dark preference.
useHead({
  title: profile.title ?? profile.name,
  htmlAttrs: { class: 'theme-auto' },
  meta: profile.description
    ? [{ name: 'description', content: profile.description }]
    : [],
  link: [
    { rel: 'stylesheet', href: '/littlelink/css/reset.css' },
    { rel: 'stylesheet', href: '/littlelink/css/style.css' },
    { rel: 'stylesheet', href: '/littlelink/css/brands.css' },
    { rel: 'stylesheet', href: '/littlelink/css/brands-extended.css' },
    { rel: 'stylesheet', href: '/littlelink/css/brands-custom.css' },
  ],
})
</script>

<template>
  <div class="container">
    <div class="column">
      <img
        v-if="profile.avatar"
        class="avatar"
        :class="`
          avatar--${profile.avatarShape ?? 'rounded'}
        `"
        :src="profile.avatar"
        :alt="profile.name"
      >

      <h1>
        <div>{{ profile.name }}</div>
      </h1>
      <p v-if="profile.bio">
        {{ profile.bio }}
      </p>

      <div class="button-stack" role="navigation">
        <template v-for="(entry, index) in profile.links" :key="index">
          <h2 v-if="isSection(entry)" class="ll-section">
            {{ entry.section }}
          </h2>
          <a
            v-else
            class="button"
            :class="`
              button-${resolveColor(entry)}
            `"
            :href="entry.url"
            target="_blank"
            rel="noopener"
            role="button"
          >
            <img
              v-if="resolveIcon(entry)"
              class="icon"
              aria-hidden="true"
              :src="resolveIcon(entry)!"
              :alt="`${entry.label} logo`"
            >
            {{ entry.label }}
          </a>
        </template>
      </div>

      <footer v-if="profile.footer">
        {{ profile.footer }}
      </footer>
    </div>
  </div>
</template>

<style scoped>
.ll-section {
  width: 18.75rem;
  max-width: 100%;
  margin: 1.75rem auto 0.25rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.55;
  text-align: center;
}
</style>
