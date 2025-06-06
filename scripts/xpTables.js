export const pstats = ["mining", "woodcutting", "herbalism", "excavation"];

export const miningXPTable = {
    // Stone & similar
    stone: 1,
    andesite: 1,
    polished_andesite: 1,
    diorite: 1,
    polished_diorite: 1,
    granite: 1,
    polished_granite: 1,
    cobblestone: 1,
    deepslate: 1,
    sandstone: 1,
    red_sandstone: 1,
    netherrack: 1,
    nether_bricks: 1,
    blackstone: 1,
    end_stone: 1,

    // Ores (Overworld)
    coal_ore: 5,
    iron_ore: 7,
    copper_ore: 7,
    gold_ore: 10,
    redstone_ore: 10,
    lapis_ore: 12,
    diamond_ore: 15,
    emerald_ore: 15,

    // Ores (Nether)
    nether_quartz_ore: 10,
    nether_gold_ore: 7,
    ancient_debris: 20,

    // Special
    obsidian: 15,
};

export const woodcuttingXPTable = {
    // Overworld logs
    oak_log: 10,
    spruce_log: 12,
    birch_log: 14,
    jungle_log: 16,
    acacia_log: 18,
    dark_oak_log: 20,

    // Nether logs
    crimson_stem: 15,
    warped_stem: 15,

    // Stripped logs
    stripped_oak_log: 10,
    stripped_spruce_log: 12,
    stripped_birch_log: 14,
    stripped_jungle_log: 16,
    stripped_acacia_log: 18,
    stripped_dark_oak_log: 20,
    stripped_crimson_stem: 15,
    stripped_warped_stem: 15,
};

export const excavationXPTable = {
    dirt: 1,
    grass_block: 1,
    coarse_dirt: 10,
    rooted_dirt: 10,
    podzol: 10,
    mycelium: 10,
    sand: 1,
    red_sand: 10,
    gravel: 10,
    clay: 15,
    soul_sand: 5,
    soul_soil: 5,
    mud: 5,
    snow_block: 5,
    snow: 2,
};
export const herbalismXPTable = {
    // Crops
    wheat: 10,
    carrots: 10,
    potatoes: 10,
    beetroots: 10,
    nether_wart: 10,

    // Natural plants
    tall_grass: 2,
    grass: 2,
    fern: 2,
    large_fern: 2,
    dead_bush: 2,
    sweet_berry_bush: 5,
    glow_lichen: 2,

    // Mushrooms
    red_mushroom: 5,
    brown_mushroom: 5,
    mushroom_stem: 5,

    // Flowers
    dandelion: 3,
    poppy: 3,
    blue_orchid: 3,
    allium: 3,
    azure_bluet: 3,
    red_tulip: 3,
    orange_tulip: 3,
    white_tulip: 3,
    pink_tulip: 3,
    oxeye_daisy: 3,
    cornflower: 3,
    lily_of_the_valley: 3,
    sunflower: 4,
    lilac: 4,
    rose_bush: 4,
    peony: 4,

    // Others
    cactus: 5,
    sugar_cane: 5,
    bamboo: 5,
    vine: 2,
};

export const fishingXPTable = {
    raw_cod: 10,
    raw_salmon: 10,
    clownfish: 5,
    pufferfish: 5,
    tropical_fish: 7,
    nautilus_shell: 15,
    ink_sac: 8,
    prismarine_shard: 12,
    prismarine_crystals: 12,
    treasure: 20, // generic treasure catch XP
    junk: 3, // generic junk catch XP
};

//Pvp
export const combatXPTable = {
    // Swords
    hit_swords: 6,
    kill_swords: 18,

    // Axes
    hit_axes: 6,
    kill_axes: 18,

    // Archery
    hit_bow: 10,
    kill_bow: 30,

    // Unarmed
    hit_unarmed: 4,
    kill_unarmed: 12,

    // Taming
    tame: 12,
    kill_with_tamed: 18,
};

export const mobXP = {
    // Passive mobs (lower XP)
    cow: 10,
    pig: 10,
    sheep: 10,
    chicken: 10,
    horse: 15,
    wolf: 15,
    cat: 15,
    rabbit: 8,
    mooshroom: 15,
    turtle: 15,
    fox: 12,

    // Hostile mobs (medium XP)
    zombie: 20,
    skeleton: 20,
    creeper: 25,
    spider: 18,
    witch: 30,
    enderman: 35,
    slime: 15,
    ghast: 35,
    blaze: 30,
    magma_cube: 20,

    // Boss mobs (high XP)
    wither: 150,
    ender_dragon: 200,

    // Taming-specific mobs XP
    wolf_tamed: 25,
    cat_tamed: 20,
    horse_tamed: 30,
};
