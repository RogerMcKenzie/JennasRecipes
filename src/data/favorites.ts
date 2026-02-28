export interface FavoriteRecipe {
    id: number;
    title: string;
    image: string;
    ingredients: string[];
}

export const favorites: FavoriteRecipe[] = [
    {
        id: 1,
        title: 'Spicy Garlic Shrimp',
        image: '/Images/SpicyShrimp.jpg',
        ingredients: [
            '8 ounces uncooked fettuccine pasta',
            '1/4 cup butter, cubed',
            '1-1/2 cups heavy whipping cream',
            '1 pound cooked medium shrimp, peeled and deveined',
            '3/4 cup grated Parmesan cheese',
            '1 garlic clove, minced',
            '1/4 teaspoon pepper',
            '1 teaspoon minced fresh parsley',
        ],
    },
    {
        id: 2,
        title: 'Chicken Bacon Quesadilla',
        image: '/Images/ChickenBacon.jpg',
        ingredients: [
            '8 ounces cooked chicken, shredded or chopped',
            '1/4 cup barbecue sauce',
            '4 slices bacon, cooked and crumbled',
            '1/4 cup ranch dressing',
            '4 flour tortillas (10 inches)',
            '2 cups shredded cheddar cheese',
            '2 tablespoons butter, melted',
            '1/4 teaspoon garlic powder',
        ],
    },
    {
        id: 3,
        title: 'Tonkatsu',
        image: '/Images/Tonkatsu.jpg',
        ingredients: [
            '4 boneless pork loin chops',
            'Salt and ground black pepper to taste',
            '1/4 cup all-purpose flour',
            '1 egg, beaten',
            '3/4 cup panko (Japanese-style bread crumbs)',
            '1 cup cabbage, finely shredded',
            '1/2 cup Tonkatsu sauce',
        ],
    },
    {
        id: 4,
        title: 'Jerk Chicken',
        image: '/Images/Jerk Chicken.jpg',
        ingredients: [
            '4 boneless, skinless chicken breasts',
            '1 tablespoon Garlic Powder',
            '2 teaspoons Salt',
            '2 teaspoons Cayenne Pepper',
            '2 teaspoons Brown Sugar',
            '1 teaspoon Allspice Powder',
            '1 teaspoon Freshly Cracked Black Pepper',
            '1 tablespoon Onion Powder',
        ],
    },
];
