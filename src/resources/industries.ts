import { Product } from '../entities/product'

export const industries: Industry[] = [
    {
        id: 'apparelFootwear',
        label: 'Apparel/Footwear',
        items: [
            {
                name: 'Heartloom Heartloom Chloe Sweater-rose',
                description: `The relaxed draped shoulders create an effortlessly casual look without sacrificing style.`,
                price: 6.89,
            },
            {
                name: 'Neon Blonde Dreamer Jacket',
                description: `An oversized, light weight jacket with a thick lined denim and soft faux fur on the inside`,
                price: 0.01,
            },
            {
                name: 'J/Slides Whitney Boot',
                description: `Trend-forward, hiking boot-inspired lacing joins forces with a cushy rubber sole on a high-top, wedge sneaker refined with touches of plush faux fur.`,
                price: 245,
            },
            {
                name: 'Ronny Kobo Zarma Dress',
                description: `Wear this asymmetrical dress to any cocktail event or a dinner date. It's perfect with a heel.`,
                price: 280,
            },
            {
                name: 'Ducie Felice',
                description: `New in this autumn for people who want a totally faux fur option of the classic Ducie parka.`,
                price: 1360,
            },
            {
                name: 'LNA Enwrap Brushed Tee',
                description: `Get all wrapped up in the Enwrap Brushed Tee from LNA.`,
                price: 145,
            },
        ],
    },
    {
        id: 'bike',
        label: 'Bike',
        items: [
            {
                name: 'Escape 2',
                description: `With its lightweight ALUXX aluminum frame and smooth, stable 700c wheels, Escape is your ticket to on-road versatility. Ride city streets or country roads. For commuting, fitness, or just for the fun of it. Confident upright geometry and a wide range of gears give it a sporty ride quality. Whatever road or path you choose, Escape is always up for the adventure`,
                price: 649,
            },
            {
                name: 'SLR0 Brake Pads',
                description: `Giant SLR  Brake Pads feature single specific compound for carbon rims for great stopping performance in wet or dry conditions.`,
                price: 12.99,
            },
            {
                name: 'Pursuit',
                description: `Developed with input from Team Sunweb riders, Pursuit combines the aero speed of a TT helmet with the head cooling ventilation of a pro level road helmet.`,
                price: 239.99,
            },
            {
                name: 'Ding A Ling Brass',
                description: `Simple and smart design in a crisp sounding brass bell`,
                price: 14.99,
            },
            {
                name: 'Atx 2',
                description: `Closely related to Giant off-road bikes, ATX features the familiar flat-handlebar and 100mm suspension fork of a traditional XC mountain bike. A lightweight ALUXX aluminum frame, engineered with comfortable geometry for challenging terrain, adds to its rugged personality. It also uses size-specific wheel diameters—smaller size bikes use 26-inch wheels, while larger sizes use 27.5. This tailors the bike’s handling to every rider’s size and height. Powerful disc brake technology gives you confident handling in all weather or riding conditions, and integrated mounts let you easily add racks or fenders to suit your riding adventures.`,
                price: 599.99,
            },
            {
                name: 'Rack-it E-bike',
                description: `Speciffically designed for Quick-E, Dirt-E and Toughroad-E`,
                price: 79.99,
            },
        ],
    },
    {
        id: 'booksToysAndGifts',
        label: 'Books/Toys/Gifts',
        items: [
            {
                name: 'Chunky Alphabet Puzzle',
                description: `A, B, C, D! Learning the alphabet is great fun! Can you learn the letters right through to Z? This colorful puzzle provides children with an introduction to capital letters so that they can take their first steps towards reading and writing. The chunky puzzle pieces stand up by themselves and can be used to spell out words. Or put them in their correct places to learn the alphabet. Suitable for children aged three years and up.`,
                price: 19.99,
            },
            {
                name: 'Elephant Family Puzzle',
                description: `A favorite for tots and preschool aged children, BeginAgain Elephant Family Puzzle game is a bright and beautiful way to develop essential motor skills and problem solving skills. With five differently shaped, colorful pieces, this animal game and educational toy makes a perfect first puzzle for all children.`,
                price: 12.99,
            },
            {
                name: 'Solar Power Circuit',
                description: `Step into the future with this solar-powered railway set. The engine has its own solar panel that generates enough electricity to power its lights. Push it up the incline and through the modern spiral tunnels. Then drive on down to the workshop where the technician is ready to do a tune-up. For ages three and over.`,
                price: 33.99,
            },
            {
                name: 'Doll Dress Ice Princess - 16"-20" Doll/Plush',
                description: `This perfect match to our Ice Princess Dress is made with a durable stretch velvet bodice and satin skirt, overlaid with a metallic snowflake design.`,
                price: 23.99,
            },
            {
                name: 'Star Wars TM - First Order Specialists Battle Pack',
                description: `Send in reinforcements with the First Order Specialists Battle Pack! Seat the First Order Gunner in position, load the spring-loaded shooter and turn the turret to take aim. Guard the cannon with the tough First Order Stormtrooper Executioners and their laser axes. Can you defeat the Resistance? That's for you to decide...`,
                price: 16.99,
            },
            {
                name: 'LEGO Large Creative Brick Box',
                description: `Build up a storm with this big box of classic LEGO bricks in 33 different colors. With lots of different windows and doors, along with other special pieces to inspire you, you can really run with your imagination. With some ideas to get you started, this set provides the perfect creative toolkit for budding builders of all ages to enjoy some classic LEGO construction. It comes in a convenient plastic storage box and is an ideal supplement to any existing LEGO collection.`,
                price: 59.99,
            },
        ],
    },
    {
        id: 'healthAndBeauty',
        label: 'Health & Beauty',
        items: [
            {
                name: 'Amouage Imitation Woman',
                description: `Embody the allure of New York; a luminous floral fragrance that represents the glamour and glory of the 1970's.`,
                price: 330,
            },
            {
                name: 'Alyria Intense Hydrating Serum 30g',
                description: `Formulated with high performance hydrating complexes, HydrovitonëåPLUS and PatcH2OTM, the Intense Hydrating Serum will not only provide skin with an instant boost of hydration, but will also provide optimal hydration over time.`,
                price: 73,
            },
            {
                name: 'Nuori Lip Treat New York 15ml',
                description: `Lip Treat New York is a delicious, berry-tinted blend of natural hydrating wonders that gives your lips a vibrant and fresh look, inspired by the edgy, yet sophisticated New York City.`,
                price: 35,
            },
            {
                name: 'Skinmedica Glypro Daily Firming Lotion 177.4ml',
                description: `This hydrating body lotion helps to improve the appearance of cellulite for skin that is soft and smooth.`,
                price: 81,
            },
            {
                name: `RITUELS 100% NATURAL TRADITIONAL TALLOW SHAVING SOAP 140 G (4.9 OZ.)`,
                description: `This handmade traditional tallow shaving soap has been concocted like soaps of yesteryear. Its soft texture provides a creamy, durable foam.`,
                price: 32,
            },
            {
                name: 'Kevin Murphy Plumping.wash 250ml',
                description: `Kevin Murphy Hair Products are available by phone order only, please call 1 855 687-3886 or you may purchase them at our boutique in Montreal.`,
                price: 39,
            },
        ],
    },
    {
        id: 'homeAndGarden',
        label: 'Home & Garden',
        items: [
            {
                name: 'Mod',
                description:
                    'Mod is a shapely chair reminiscent of a time when design was bold and daring. You’ll feel supported from all sides thanks to a high back, deep seat and curved arms. Its durable tweed upholstery and button-tufting are a nod to the sharply dressed suits seen on Madison Avenue in the 60s',
                price: 399,
            },
            {
                name: 'Texta',
                description: `Like your favorite sweater, made better. Hand-woven wool is tightly looped into a sophisticated, soft rug for your floors. This is a perfect option for wood or stone floors and organic-chic, all-natural spaces. Our wool rugs are sourced from real, happy sheep. These sheep live the good life: rolling hills, sweet grass, and long naps. As such, our rugs occasionally have a little bit of that nap-grass stuck in their fibres. If you find a piece of grass, make a wish!`,
                price: 599,
            },
            {
                name: 'Caliper',
                description: `Bring your A game. Starting from the top, the Caliper shelf’s a-shaped frame is solid wood and ends with perfectly positioned legs. The laminated shelves provide the perfect place to display everything from your books to stemware — depending on who you’re trying to impress.`,
                price: 549,
            },
            {
                name: 'Seno',
                description: `Linear proportions in solid American Black Walnut make the Seno table ideal for a wonderful dining experience.`,
                price: 1.049,
            },
            {
                name: 'Taiga',
                description: `An American White Oak veneered wood frame on blackened iron legs, this bed comes with an industrial chic pedigree. A wire brushed finish exposes the beauty of the grain with naturally occurring knots and exposed bolts all contributing to the vintage character. The solid slat base allows for a low profile mattress without a boxspring and there's room under the bed for storage baskets. The back of the headboard is fully finished so the bed doesn't have to be placed against a wall.`,
                price: 1.299,
            },
            {
                name: 'Mara',
                description: `A graceful mid-century modern look that’s set in stone. Solid wood legs are topped off by an elegant marble slab for a clean, compact look that’s perfect for small spaces. It's a classic design that will transition through any style of seating. Mix and match with solid wood tables.`,
                price: 349,
            },
        ],
    },
    {
        id: 'vapeAndSmoke',
        label: 'Vape & Smoke',
        items: [
            {
                name: 'Aspire K2 Kit',
                description: `The Aspire K2 Quick Start Kit is a simple plug-and-play technology from the Aspire’s proud line-up, implementing 800mAh internal battery capacity, 1.8mL juice capacity, bottom-fill method, and utilization of the Aspire’s BVC Atomizer Core. The form factor is designed within a slim and stealth chassis alongside carbon fiber finish, the single-button operation featured set is designed for ease of use and handling. The utilization of Aspire’s BVC Atomizer Core that was introduced in the Nautilus Tank is optimize for dependable performance. Furthermore, an included MicroUSB charging port makes recharging intuitive, emphasizing plug-and-play style. Elegant and highly capable output all at an affordable price, the Aspire K2 Quick Start Kit is a must-own device for beginners or on-the-go collection`,
                price: 44.99,
            },
            {
                name: 'Bluff Mountain Blueberry',
                description: `A classic sweet and smooth blueberry flavor. It’s a fruity and sweet vape that is an easy “go to” flavor.`,
                price: 16.99,
            },
            {
                name: 'Aspire K1',
                description: `The K1 is a new generation of glassomizer, which uses the Aspire “BVC” (Bottom Vertical Coil) technology. This new technology is designed to last longer while still giving users the purest and cleanest taste from e-liquids. The stainless steel drip tip and the pyrex glass give the K1 a strong metallic impression, which makes it look very exquisite and high-end. This unique design also makes it easy to carry, install and refill.`,
                price: 11.99,
            },
            {
                name: 'TFV8 Baby Single Coil',
                description: `These coils bring the TFV8 Baby Beast Tank to life. Coil styles ranging from a full octet of coils in one head to the V8 RBA base. No matter your vaping style, these turbocharged coils will cater to your vaping preference.`,
                price: 4.99,
            },
            {
                name: 'USB EGo Charger',
                description: `This Aspire USB Charger cable can be used with any Aspire CF batteries (as well as most eGo style batteries).`,
                price: 7.99,
            },
            {
                name: 'Aspire PockeX',
                description: `Being just a bit shorter than the iPhone 5s, the Aspire PockeX is the ultimate pocket All-in-One (AIO) device. Packed with a 0.6Ω stainless steel Nautilus X U-Tech coil, the PockeX is a sub-ohm device. The PockeX has a wide drip-tip and large top-airflow allowing for increased vapor production. PockeX’s discrete size and low-profile sub-ohm vapor production makes the PockeX your must-have vape while indoors or on-the-go.`,
                price: 34.99,
            },
        ],
    },
    {
        id: 'pet',
        label: 'Pet',
        items: [
            {
                name: `Acana Cat Kibble 12 Lbs Grasslands - Lamb, Trout, Gamebird`,
                description: `Protein-rich and carbohydrate-limited, ACANA cat foods feature unmatched inclusions of free-run chicken and turkey, wild-caught fish and nest-laid eggs — all farmed or fished within our region and delivered in WholePrey™ ratios to our kitchens FRESH EACH DAY, so they’re brimming with goodness to nourish completely.`,
                price: 54.97,
            },
            {
                name: `Earthborn Holistic Cat Kibble Feline Vantage - Chicken 14 Lbs`,
                description: `Keep your cat happy and healthy with Earthborn Holistic Cat Kibble! Each flavor will provide plenty of protein to to keep your feline friend on their toes and ready to go! Every crunchy bite is loaded with veggies and fruits like blueberries, spinach, apples, and cranberries, plus all the nutrients your pal needs to look and feel his best, like vitamins, omegas, taurine, and probiotics. Completely grain free, gluten free, and nothing artificial added! Proudly made in the USA in a BPA Free packaging form clean and natural gas making it environmentally friendly! We know your cat won’t be able to resist the delicious taste of Earthborn!`,
                price: 37.97,
            },
            {
                name: `Acana 3.25 Oz Freeze Dried Dog Treats Mackerel & Greensacana Heritage 60/40 Dog Kibble 13 Lb Meats`,
                description: `ACANA Heritage foods are rich in protein, low in carbohydrates and feature 60% inclusions of free-run poultry, freshwater fish or heritage meats; all prepared to our Biologically Appropriate™ standards.`,
                price: 36.97,
            },
            {
                name: `Boxiepro Probiotic Litter Deep Clean Scent Free 16 Lb Pouch`,
                description: `BoxieCat BoxiePro Probiotic litter has an exclusive flat top technology clumps instantly at the top of the litter box, so it scoops easily and stays clean—all while being 99.9% dust-free! Low-tracking formula keeps your kitty's paws cleaner—and cleaner paws make a cleaner home. Unique probiotic formula cuts the spread of germs while destroying bacteria and odors, protecting your home and family. One 16-pound bag will last your feline family about a month, and is great for both single and multi-cat homes. Ideal for pet parents who want a healthy clay litter option for their home.`,
                price: 33.97,
            },
            {
                name: 'Boxiecat Litter Scent-free Flexbox Bag 28 Lb',
                description: `BoxieCat Award winning and vet recommended premium litter is made from 100% all-natural clumping clay. Instantly forms a flat-top clump for easy scooping that makes clean-up a breeze, perfect for single or multi-cat homes and all box types. An advanced dust suppression process makes this litter over 99.9% dust-free; ideal for allergy sufferers. Eliminates ammonia odors, vet recommended and hypoallergenic, this scent-free formula is truly odorless and contains no fragrances, additives, dyes or fillers. Proudly made in the USA!`,
                price: 24.97,
            },
            {
                name: 'Petmate Metal Litter Scoop',
                description: `Petmate Metal Litter Scoop makes cleaning your cat?s litter box simple and easy. This scooper features a comfort-grip handle, rounded corners to easily clean hard to reach corners and large slits that allow clean litter to sift through while containing dirty litter for disposal. Petmate Metal Litter Scoop is ideal for all litter type. Size: 12.5" x 5.5".`,
                price: 14.97,
            },
        ],
    },
    {
        id: 'candy',
        label: 'Candy',
        items: [
            {
                name: 'Random Jelly bean',
                description: `A single jelly bean, of a random selection from our current list of 89 different colors and flavors!`,
                price: 0.01,
            },
            {
                name: 'Jaw breaker',
                description: `This oversize hard gum will slowly melt in your mouth and provide hours of chewiness`,
                price: 0.25,
            },
            {
                name: 'Ultra Peppermint',
                description: `Just like your Grandma liked! This peppermint might sound boring, but our blend will bring tears to your eyes.`,
                price: 0.1,
            },
            {
                name: 'Jelly Bean bag',
                description: `Each and every one of our 89 different colors and flavors of Jelly beans, plus 15 random doubles for a total of 104 Jelly beans.`,
                price: 1,
            },
            {
                name: 'White Chocolate bark with almonds',
                description: `A small piece of white chocolate with incrusted almonds. Delicious!`,
                price: 5,
            },
            {
                name: 'Super nougat bar',
                description: `A massive piece of nougat which will last you months, or perhaps hours? Who are we to judge`,
                price: 10,
            },
            {
                name: 'Free candy',
                description: 'Free candy description',
                price: 0,
            },
            {
                name: '9Nines candy',
                description: '9Nines candy description',
                price: 999999999,
            },
        ],
    },
]

const candyIndustry = industries.find(({ id }) => id === 'candy')!
export const defaultIndustry = candyIndustry

// Types

type Industry = {
    id: string
    label: string
    items: Product[]
}
