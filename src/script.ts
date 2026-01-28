enum VerRanges
{
    UnlitTorch = 1, /* 13w36a/b */
    Namespace = 2, /* 14w06a+ */
    CamelCase = 3, /* 16w32a - 16w35a */
    EntityRevert = 4, /* 16w36a - 17w46a */
}

let TargetVer: VerRanges;

let statFileName: string;

// Some 1.8 IDs due to the namespace IDs not happening till 14w05b
// as well as IDs being insane in the 150 - 180 range
let BlockNamespace: string[] = ["air",
    "stone", "grass", "dirt", "cobblestone",
    "planks", "sapling", "bedrock", "flowing_water",
    "water", "flowing_lava", "lava", "sand", "gravel",
    "gold_ore", "iron_ore", "coal_ore", "log", "leaves",
    "sponge", "glass","lapis_ore", "lapis_block", "dispenser",
    "sandstone", "noteblock", "bed", "golden_rail", 
    "detector_rail", "sticky_piston", "web", 
    "tallgrass", "deadbush", "piston", "piston_head",
    "wool", "piston_extention", "yellow_flower",
    "red_flower", "brown_mushroom", "red_mushroom",
    "gold_block", "iron_block", "double_stone_slab",
    "stone_slab", "brick_block", "tnt", "bookshelf",
    "mossy_cobblestone", "obsidian", "torch", "fire",
    "mob_spawner", "oak_stairs", "chest", "redstone_wire",
    "diamond_ore", "diamond_block", "crafting_table",
    "wheat", "farmland", "furnace", "lit_furnace",
    "standing_sign", "wall_sign", "wooden_door",
    "ladder", "rail", "stone_stairs", "wall_sign",
    "level", "stone_pressure_plate", "iron_door",
    "wooden_pressure_plate", "redstone_ore",
    "lit_redstone_ore", "unlit_redstone_ore",
    "unlit_redstone_torch", "redstone_torch",
    "stone_button", "snow_layer", "ice", "snow",
    "cactus", "clay", "reeds", "jukebox", "fence",
    "pumpkin", "netherrack", "soul_sand", "glowstone",
    "portal", "lit_pumpkin", "cake", "unpowered_repeater",
    "powered_repeater", "stained_glass", "trapdoor",
    "monster_egg", "stonebrick", "brown_mushroom_block",
    "red_mushroom_block", "iron_bars", "melon_block",
    "pumpkin_stem", "melon_stem", "vine", "fence_gate",
    "brick_stairs", "stone_brick_stairs", "mycelium",
    "waterlily", "nether_brick", "nether_brick_stairs",
    "nether_wart", "enchanting_table", "brewing_stand",
    "cauldron", "end_portal", "end_portal_frame",
    "end_stone", "dragon_egg", "redstone_lamp",
    "redstone_lamp", "lit_redstone_lamp",
    "double_wooden_slab", "wooden_slab", "cocoa",
    "sandstone_stairs", "emerald_ore", "ender_chest",
    "tripwire_hook", "tripwire", "emerald_block",
    "spruce_stairs", "birch_stairs", "jungle_stairs",
    "command_block", "beacon", "cobblestone_wall",
    "flower_pot", "carrots", "potatoes", "wooden_button",
    "skull", "anvil", "trapped_chest",
    "light_weighted_pressure_plate", "heavy_weighted_pressure_plate",
    "unpowered_comparator", "powered_comparator",
    "daylight_detector", "redstone_block", "quartz_ore",
    "hoppper", "quartz_block", "quartz_stairs", "activator_rail",
    "dropper", "stained_hardened_clay", "stained_glass_pane",
    "leaves2", "log2", "acacia_stairs", "dark_oak_stairs",
    "slime", "barrier", "iron_trapdoor", "prismarine",
    "sea_lantern", "hay_block", "carpet", "hardened_clay",
    "coal_block", "packed_ice", "double_plant", "standing_banner",
    "wall_banner", "daylight_detector_inverted"
];

// Why is 1.6 items (416 (horse saddles into armour stands) to 421)
// between 1.8 items and who do i need to explode for it
let ItemNamespace: string[] = ["iron_shovel", "iron_pickaxe",
    "iron_axe", "flint_and_steel", "apple", "bow", "arrow",
    "coal", "diamond", "iron_ingot", "gold_ingot", "iron_sword",
    "wooden_sword", "wooden_shovel", "wooden_pickaxe", "wooden_axe",
    "stone_sword", "stone_shovel", "stone_pickaxe", "stone_axe",
    "diamond_sword", "diamond_shovel", "diamond_pickaxe",
    "diamond_axe", "stick", "bowl", "mushroom_stew", "golden_sword",
    "golden_shovel", "golden_pickaxe", "golden_axe", "string",
    "feather", "gunpowder", "wooden_hoe", "stone_hoe", "iron_hoe",
    "diamond_hoe", "golden_hoe", "wheat_seeds", "wheat", "bread",
    "leather_helmet", "leather_chestplate", "leather_leggings",
    "leather_boots", "chainmail_helmet", "chainmail_chestplate",
    "chainmail_leggings", "chainmail_boots", "iron_helmet",
    "iron_chestplate", "iron_leggings", "iron_boots", "diamond_helmet",
    "diamond_chestplate", "diamond_leggings", "diamond_boots",
    "golden_helmet", "golden_chestplate", "golden_leggings",
    "golden_boots", "flint", "porkchop", "cooked_porkchop", "painting",
    "golden_apple", "sign", "wooden_door", "bucket", "water_bucket",
    "lava_bucket", "minecart", "saddle", "iron_door", "redstone",
    "snowball", "boat", "leather", "milk_bucket", "brick", "clay_ball",
    "reeds", "paper", "book", "slime_ball", "chest_minecart",
    "furnace_minecart", "egg", "compass", "fishing_rod", "clock",
    "glowstone_dust", "fish", "cooked_fish", "dye", "bone",
    "sugar", "cake", "bed", "repeater", "cookie", "filled_map", "shears",
    "melon", "pumpkin_seeds", "melon_seeds", "beef", "cooked_beef",
    "chicken", "cooked_chicken", "rotten_flesh", "ender_pearl",
    "blaze_rod", "ghast_tear", "gold_nugget", "nether_wart",
    "potion", "glass_bottle", "spider_eye", "fermented_spider_eye",
    "blaze_powder", "magma_cream", "brewing_stand", "cauldron", 
    "ender_eye", "speckled_melon", "spawn_egg","experience_bottle", 
    "fire_charge", "writable_book", "written_book", "emerald", 
    "item_frame", "flower_pot", "carrot", "potato", "baked_potato", 
    "poisonous_potato", "map", "golden_carrot", "skull", "carrot_on_a_stick",
    "nether_star", "pumpkin_pie", "fireworks", "firework_charge",
    "enchanted_book", "comparator", "netherbrick", "quartz",
    "tnt_minecart", "hopper_minecart", "prismarine_shard",
    "prismarine_crystals", "rabbit", "cooked_rabbit", "rabbit_stew",
    "rabbit_foot", "rabbit_hide", "armor_stand", "iron_horse_armor",
    "golden_horse_armor", "diamond_horse_armor", "lead", "name_tag", 
    "command_block_minecart"
];

let DiscNamespace: string[] = ["13", "cat", "blocks", "chirp",
    "far", "mall", "mellohi", "stal", "strad", "ward", "11", "wait"];

let EntityLowerSnakecase: string[] = ["arrow", "bat", "boat", "blaze",
    "chicken", "cow", "creeper","enderman", "endermite", "fireball",
    "ghast", "item", "painting", "pig", "rabbit", "sheep", "shulker",
    "silverfish", "slime", "snowman", "snowball", "spider", "squid",
    "villager", "witch", "wolf", "xp_bottle", "egg", "ender_pearl",
    "falling_block", "fireworks_rocket", "magma_cube", "minecart",
    "chest_minecart", "commandblock_minecart", "furnace_minecart",
    "hopper_minecart", "spawner_minecart", "tnt_minecart", "mooshroom",
    "ocelot", "potion", "tnt", "wither", "zombie_pigman", "guardian",
    "horse", "skeleton", "zombie", "area_effect_cloud", "armor_stand",
    "cave_spider", "dragon_fireball", "ender_crystal", "ender_dragon",
    "xp_orb", "villager_golem", "item_frame", "leash_knot", "lightning_bolt",
    "polar_bear", "shulker_bullet", "small_fireball", "spectral_arrow",
    "wither_skull",
]

let EntityUpperCamelCase: string[] = ["Arrow", "Bat", "Boat", "Blaze",
    "Chicken", "Cow", "Creeper", "Enderman", "Endermite", "Fireball",
    "Ghast", "Item", "Painting", "Pig", "Rabbit", "Sheep", "Shulker",
    "Silverfish", "Slime", "SnowMan", "Snowball", "Spider", "Squid",
    "Villager", "Witch", "Wolf", "ThrownExpBottle", "ThrownEgg", 
    "ThrownEnderpearl", "FallingSand", "FireworksRocketEntity", "LavaSlime",
    "MinecartRideable", "MinecartChest", "MinecartCommandBlock", 
    "MinecartFurnace", "MinecartHopper", "MinecartSpawner", "MinecartTNT",
    "MushroomCow", "Ozelot", "ThrownPotion", "PrimedTNT", "WitherBoss",
    "PigZombie", "Guardian", "EntityHorse", "Skeleton", "Zombie",
    "AreaEffectCloud", "ArmorStand", "CaveSpider", "DragonFireball",
    "EnderCrystal", "EnderDragon", "EyeOfEnderSignal", "XPOrb", "VillagerGolem",
    "ItemFrame", "LeashKnot", "LightningBolt", "PolarBear", "ShulkerBullet",
    "SmallFireball", "SpectralArrow", "WitherSkull"
];

async function filePreview() {
    var files = (document.getElementById("fileInput") as HTMLInputElement).files;
    if(!files)
    {
        console.log("Null!");
        return;
    }

    if(files.length)
    {
        var loadedFile = files[0];
        let previewFile: string;

        if(loadedFile) 
        {
            previewFile = await loadedFile?.text();

            let previewJSON = JSON.parse(previewFile);
            previewJSON = JSON.stringify(previewJSON, null, 2);

            document.getElementById("filePreviewName")!.innerText = loadedFile.name;

            var Preview = document.getElementById("filePreview")!
            Preview.innerHTML = previewJSON.toString();
            Preview.style.maxHeight = "400px";
            Preview.style.maxWidth = "500px";
            Preview.style.overflowY = "scroll";
            Preview.style.overflowX = "auto";
        }
    }
}

async function Load()
{

    TargetVer = (document.getElementById("targetVer") as HTMLSelectElement).selectedIndex;

    var files = (document.getElementById("fileInput") as HTMLInputElement).files;
    if(!files)
    {
        console.log("Null!");
        return;
    }

    if(files.length)
    {
        var loadedFile = files[0];
        let statFile: string;

        statFileName = loadedFile.name;

        if(loadedFile) 
        {
            statFile = await loadedFile?.text();
            DataFixerUpper(statFile);
        }
        else
        {
            console.error("Loaded File Null!");
            return;
        }
    }
    else console.log("Empty!");
}

function Save(statFile: string) {
    var blob = new Blob([statFile], {type: "application/json"});
    var url = URL.createObjectURL(blob);

    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', statFileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

function DataFixerUpper(statFile: string)
{
    let VerIndex: number = TargetVer.valueOf() + 1;

    if(VerIndex > 0) // 13w37a - 1.7.10/14w05b numeric
    {
        // Unlit torch into a lit torch
        statFile = statFile.replace("stat.useItem.75", "stat.useItem.76")
        statFile = statFile.replace("stat.craftItem.75", "stat.craftItem.76")
    }

    if(VerIndex > 1) // 14w06a+ (Namespace)
    {
        // Numerical to Namespace
        // God awful way of doing this but idk how to read each entry
        for(let i = 2256; i > 2267; i++) // Music Discs
        {
            statFile = statFile.replace("stat.useItem." + i, "stat.useItem.minecraft.record_" + DiscNamespace[i - 2256]);
            statFile = statFile.replace("stat.craftItem." + i, "stat.craftItem.minecraft.record_" + DiscNamespace[i - 2256]);
        }

        for(let i = ItemNamespace.length + 256; i > 256; i--) // Items 
        {
            statFile = statFile.replace("stat.useItem." + i, "stat.useItem.minecraft." + ItemNamespace[i - 256]);
            statFile = statFile.replace("stat.craftItem." + i, "stat.craftItem.minecraft." + ItemNamespace[i - 256]);
        }

        for(let i = BlockNamespace.length; i > 0; i--) // Blocks
        {
            statFile = statFile.replace("stat.useItem." + i, "stat.useItem.minecraft." + BlockNamespace[i]);
            statFile = statFile.replace("stat.craftItem." + i, "stat.craftItem.minecraft." + BlockNamespace[i]);
        }
    }

    if(VerIndex > 2) // entity snakecase (16w32a to 16w35a)
    {
        for(let i = 0; i < EntityLowerSnakecase.length; i++)
        {
            statFile = statFile.replace("stat.killEntity." + EntityUpperCamelCase[i], "stat.killEntity.minecraft:" + EntityLowerSnakecase[i]);
            statFile = statFile.replace("stat.entityKilledBy." + EntityUpperCamelCase[i], "stat.entityKilledBy.minecraft:" + EntityLowerSnakecase[i]);
        }
    }

    if(VerIndex > 3) // entity camelcase (reverted)
    {
        // Converts all the entities into the old format
        for(let i = 0; i < EntityLowerSnakecase.length; i++)
        { 
            statFile = statFile.replace("stat.killEntity.minecraft:" + EntityLowerSnakecase[i], "stat.killEntity." + EntityUpperCamelCase[i]);
            statFile = statFile.replace("stat.entityKilledBy.minecraft:" + EntityLowerSnakecase[i], "stat.entityKilledBy." + EntityUpperCamelCase[i]);
        }
        
        // horses (and skeletons and zombies) are split into seperate entities but the horse specifically has a new name
        // so this fixed that in particular
        statFile = statFile.replace("stat.killEntity.EntityHorse", "stat.killEntity.Horse");
        statFile = statFile.replace("stat.entityKilledBy.EntityHorse", "stat.entityKilledBy.Horse");
    }

    Save(statFile)
}
