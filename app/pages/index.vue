<script setup lang="ts">
import type { LittleLinkConfig, LittleLinkItem } from '@/types/littlelink'
import config from '@/config/littlelink.json'

// Standalone page: skip Sink's default marketing layout.
definePageMeta({ layout: false })

const profile = config as LittleLinkConfig

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
        <a
          v-for="(item, index) in profile.links"
          :key="index"
          class="button"
          :class="`
            button-${resolveColor(item)}
          `"
          :href="item.url"
          target="_blank"
          rel="noopener"
          role="button"
        >
          <img
            v-if="resolveIcon(item)"
            class="icon"
            aria-hidden="true"
            :src="resolveIcon(item)!"
            :alt="`${item.label} logo`"
          >
          {{ item.label }}
        </a>
      </div>

      <footer v-if="profile.footer">
        {{ profile.footer }}
      </footer>
    </div>
  </div>
</template>
