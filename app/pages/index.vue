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
  return name ? `/littlelink/icons/${name}.svg` : null
}

useHead({
  title: profile.title ?? profile.name,
  meta: profile.description
    ? [{ name: 'description', content: profile.description }]
    : [],
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <div class="absolute top-4 right-4 z-10">
      <SwitchTheme />
    </div>

    <main class="flex flex-1 flex-col items-center justify-center">
      <div class="ll-root">
        <img
          v-if="profile.avatar"
          :src="profile.avatar"
          :alt="profile.name"
          class="avatar"
          :class="`
            avatar--${profile.avatarShape ?? 'rounded'}
          `"
        >

        <h1>{{ profile.name }}</h1>
        <p v-if="profile.bio" class="bio">
          {{ profile.bio }}
        </p>

        <nav class="button-stack" role="navigation">
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
        </nav>

        <footer v-if="profile.footer" class="ll-footer">
          {{ profile.footer }}
        </footer>
      </div>
    </main>
  </div>
</template>

<style>
@import '@/assets/css/littlelink.css';
</style>
