import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

export interface LayoutConfig {
    preset: string;
    primary: string;
    surface: string | undefined | null;
    darkTheme: boolean;
    menuMode: string;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    configSidebarVisible: boolean;
    mobileMenuActive: boolean;
    menuHoverActive: boolean;
    activePath: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

    layoutConfig = signal<LayoutConfig>({
        preset: 'Lara',
        primary: 'emerald',
        surface: null,
        darkTheme: false,
        menuMode: 'static'
    });

    layoutState = signal<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        configSidebarVisible: false,
        mobileMenuActive: false,
        menuHoverActive: false,
        activePath: null
    });

    theme = computed(() => (this.layoutConfig().darkTheme ? 'dark' : 'light'));

    isSidebarActive = computed(() => this.layoutState().overlayMenuActive || this.layoutState().mobileMenuActive);

    isDarkTheme = computed(() => this.layoutConfig().darkTheme);

    getPrimary = computed(() => this.layoutConfig().primary);

    getSurface = computed(() => this.layoutConfig().surface);

    isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

    transitionComplete = signal<boolean>(false);

    private initialized = false;

    constructor() {
        effect(() => {
            const config = this.layoutConfig();

            if (!config) {
                return;
            }

            if (!this.initialized) {
                this.initialized = true;
                this.toggleDarkMode(config);
                return;
            }

            this.handleDarkModeTransition(config);
        });
    }

    private handleDarkModeTransition(config: LayoutConfig): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const supportsViewTransition = 'startViewTransition' in this.document;

        if (supportsViewTransition) {
            this.startViewTransition(config);
        } else {
            this.toggleDarkMode(config);
        }
    }

    private startViewTransition(config: LayoutConfig): void {
        this.document.startViewTransition?.(() => {
            this.toggleDarkMode(config);
        });
    }

    toggleDarkMode(config?: LayoutConfig): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const _config = config || this.layoutConfig();
        if (_config.darkTheme) {
            this.document.documentElement.classList.add('app-dark');
        } else {
            this.document.documentElement.classList.remove('app-dark');
        }
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.layoutState.update((prev) => ({ ...prev, overlayMenuActive: !this.layoutState().overlayMenuActive }));
        }

        if (this.isDesktop()) {
            this.layoutState.update((prev) => ({ ...prev, staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive }));
        } else {
            this.layoutState.update((prev) => ({ ...prev, mobileMenuActive: !this.layoutState().mobileMenuActive }));
        }
    }

    showConfigSidebar() {
        this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: true }));
    }

    hideConfigSidebar() {
        this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: false }));
    }

    isDesktop() {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }

        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }
}
