import Types "../types/properties";
import List "mo:core/List";

module {
  public type Property = Types.Property;
  public type Inquiry = Types.Inquiry;
  public type PropertyFilter = Types.PropertyFilter;
  public type LifestyleTag = Types.LifestyleTag;

  // Helper: case-insensitive substring match
  func containsText(haystack : Text, needle : Text) : Bool {
    let h = haystack.toLower();
    let n = needle.toLower();
    h.contains(#text n)
  };

  // Helper: check if property tags contain any of the filter tags
  func hasAnyTag(propTags : [LifestyleTag], filterTags : [LifestyleTag]) : Bool {
    if (filterTags.size() == 0) return true;
    for (ft in filterTags.values()) {
      for (pt in propTags.values()) {
        if (pt == ft) return true;
      };
    };
    false
  };

  public func filterProperties(
    properties : List.List<Property>,
    filter : PropertyFilter,
  ) : [Property] {
    let filtered = properties.filter(func(p : Property) : Bool {
      // Budget filter
      let budgetOk = switch (filter.budgetRange) {
        case null true;
        case (?b) p.budgetRange == b;
      };
      // Locality filter (substring match)
      let localityOk = switch (filter.locality) {
        case null true;
        case (?loc) containsText(p.locality, loc) or containsText(p.location, loc);
      };
      // Tags filter (any match)
      let tagsOk = hasAnyTag(p.tags, filter.tags);
      // Property type filter
      let typeOk = switch (filter.propertyType) {
        case null true;
        case (?pt) p.propertyType == pt;
      };
      // Search query filter (title, description, location)
      let searchOk = switch (filter.searchQuery) {
        case null true;
        case (?q) {
          containsText(p.title, q) or
          containsText(p.description, q) or
          containsText(p.location, q) or
          containsText(p.locality, q)
        };
      };
      budgetOk and localityOk and tagsOk and typeOk and searchOk
    });
    filtered.toArray()
  };

  public func getById(
    properties : List.List<Property>,
    id : Nat,
  ) : ?Property {
    properties.find(func(p : Property) : Bool { p.id == id })
  };

  public func getRecommended(
    properties : List.List<Property>,
    limit : Nat,
  ) : [Property] {
    let recommended = properties.filter(func(p : Property) : Bool {
      p.isFeatured or p.isNew
    });
    let arr = recommended.toArray();
    if (arr.size() <= limit) {
      arr
    } else {
      arr.sliceToArray(0, limit)
    }
  };

  public func getFeatured(properties : List.List<Property>) : [Property] {
    let featured = properties.filter(func(p : Property) : Bool { p.isFeatured });
    featured.toArray()
  };

  public func addInquiry(
    inquiries : List.List<Inquiry>,
    nextId : Nat,
    name : Text,
    phone : Text,
    message : Text,
    propertyId : ?Nat,
    timestamp : Int,
  ) : Nat {
    let inquiry : Inquiry = {
      id = nextId;
      name;
      phone;
      message;
      propertyId;
      timestamp;
    };
    inquiries.add(inquiry);
    nextId
  };

  public func seedProperties(properties : List.List<Property>) {
    let samples : [Property] = [
      {
        id = 1;
        title = "Spacious 2BHK in Sama Road";
        description = "A well-designed 2BHK apartment with modern amenities, spacious rooms, and excellent connectivity to Vadodara city. Close to schools and parks.";
        price = 3500000;
        priceLabel = "₹35 Lac";
        propertyType = #Apartment;
        bedrooms = 2;
        bathrooms = 2;
        areaSqft = 950;
        location = "Sama Road, Vadodara";
        locality = "Sama Road";
        furnished = "Semi-Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"
        ];
        tags = [#FamilyFriendly, #NearSchools, #ReadyToMove];
        budgetRange = #ThirtyTo50L;
        isNew = true;
        isFeatured = true;
        postedDaysAgo = 2;
      },
      {
        id = 2;
        title = "Premium 3BHK Villa on Savli Road";
        description = "Luxury 3BHK villa with private garden, modular kitchen, and premium interiors. Perfect for families seeking a premium lifestyle near Savli Road.";
        price = 9500000;
        priceLabel = "₹95 Lac";
        propertyType = #Villa;
        bedrooms = 3;
        bathrooms = 3;
        areaSqft = 2100;
        location = "Savli Road, Vadodara";
        locality = "Savli Road";
        furnished = "Fully Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600"
        ];
        tags = [#LuxuryAmenities, #GreatView, #FamilyFriendly];
        budgetRange = #Above80L;
        isNew = false;
        isFeatured = true;
        postedDaysAgo = 5;
      },
      {
        id = 3;
        title = "Affordable 1BHK near Gotri";
        description = "Cozy 1BHK apartment ideal for young professionals or couples. Close to Gotri bus stand and major IT parks.";
        price = 1850000;
        priceLabel = "₹18.5 Lac";
        propertyType = #Apartment;
        bedrooms = 1;
        bathrooms = 1;
        areaSqft = 520;
        location = "Gotri, Vadodara";
        locality = "Gotri";
        furnished = "Unfurnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600"
        ];
        tags = [#InvestmentReady, #ReadyToMove];
        budgetRange = #Under30L;
        isNew = true;
        isFeatured = false;
        postedDaysAgo = 1;
      },
      {
        id = 4;
        title = "Modern 2BHK in New Sama";
        description = "Brand-new 2BHK flat in a gated society with 24/7 security, kids play area, and clubhouse. Excellent investment opportunity.";
        price = 4200000;
        priceLabel = "₹42 Lac";
        propertyType = #Apartment;
        bedrooms = 2;
        bathrooms = 2;
        areaSqft = 1050;
        location = "New Sama, Vadodara";
        locality = "New Sama";
        furnished = "Semi-Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
        ];
        tags = [#FamilyFriendly, #NearSchools, #InvestmentReady];
        budgetRange = #ThirtyTo50L;
        isNew = true;
        isFeatured = true;
        postedDaysAgo = 3;
      },
      {
        id = 5;
        title = "Luxurious Penthouse on Waghodia Road";
        description = "Stunning penthouse apartment with panoramic city views, private terrace, home theatre, and designer interiors. Ultimate luxury living.";
        price = 12000000;
        priceLabel = "₹1.2 Cr";
        propertyType = #Penthouse;
        bedrooms = 4;
        bathrooms = 4;
        areaSqft = 3200;
        location = "Waghodia Road, Vadodara";
        locality = "Waghodia Road";
        furnished = "Fully Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
        ];
        tags = [#LuxuryAmenities, #GreatView];
        budgetRange = #Above80L;
        isNew = false;
        isFeatured = true;
        postedDaysAgo = 10;
      },
      {
        id = 6;
        title = "Ready-to-Move 3BHK in Sama Road";
        description = "Immediate possession available! Spacious 3BHK with large balcony, covered parking, and top-floor location. Near reputed schools.";
        price = 5800000;
        priceLabel = "₹58 Lac";
        propertyType = #Apartment;
        bedrooms = 3;
        bathrooms = 2;
        areaSqft = 1450;
        location = "Sama Road, Vadodara";
        locality = "Sama Road";
        furnished = "Semi-Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=600",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600"
        ];
        tags = [#ReadyToMove, #NearSchools, #FamilyFriendly];
        budgetRange = #FiftyTo80L;
        isNew = false;
        isFeatured = false;
        postedDaysAgo = 7;
      },
      {
        id = 7;
        title = "Investment Plot on Savli Road";
        description = "Prime residential plot in fast-developing Savli Road corridor. Great ROI potential with nearby infrastructure projects.";
        price = 2800000;
        priceLabel = "₹28 Lac";
        propertyType = #Plot;
        bedrooms = 0;
        bathrooms = 0;
        areaSqft = 1800;
        location = "Savli Road, Vadodara";
        locality = "Savli Road";
        furnished = "NA";
        imageUrls = [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
          "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=600"
        ];
        tags = [#InvestmentReady];
        budgetRange = #Under30L;
        isNew = false;
        isFeatured = false;
        postedDaysAgo = 15;
      },
      {
        id = 8;
        title = "Elegant 2BHK with Great View in Gotri";
        description = "Beautifully designed 2BHK on the 8th floor with stunning views of greenery. Vastu-compliant layout, marble flooring, and modular kitchen.";
        price = 4800000;
        priceLabel = "₹48 Lac";
        propertyType = #Apartment;
        bedrooms = 2;
        bathrooms = 2;
        areaSqft = 1100;
        location = "Gotri, Vadodara";
        locality = "Gotri";
        furnished = "Semi-Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600"
        ];
        tags = [#GreatView, #FamilyFriendly, #ReadyToMove];
        budgetRange = #ThirtyTo50L;
        isNew = true;
        isFeatured = true;
        postedDaysAgo = 4;
      },
      {
        id = 9;
        title = "Budget 1BHK in New Sama";
        description = "Affordable and well-maintained 1BHK ideal for first-time buyers. Good connectivity to Sama bus depot and commercial areas.";
        price = 1950000;
        priceLabel = "₹19.5 Lac";
        propertyType = #Apartment;
        bedrooms = 1;
        bathrooms = 1;
        areaSqft = 490;
        location = "New Sama, Vadodara";
        locality = "New Sama";
        furnished = "Unfurnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600",
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600"
        ];
        tags = [#ReadyToMove, #InvestmentReady];
        budgetRange = #Under30L;
        isNew = false;
        isFeatured = false;
        postedDaysAgo = 20;
      },
      {
        id = 10;
        title = "3BHK Family Villa in Gotri";
        description = "Spacious independent villa in a quiet lane in Gotri. Double-storey with terrace garden, 2-car parking, and premium school nearby.";
        price = 8500000;
        priceLabel = "₹85 Lac";
        propertyType = #Villa;
        bedrooms = 3;
        bathrooms = 3;
        areaSqft = 2400;
        location = "Gotri, Vadodara";
        locality = "Gotri";
        furnished = "Semi-Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600",
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"
        ];
        tags = [#FamilyFriendly, #NearSchools, #LuxuryAmenities];
        budgetRange = #Above80L;
        isNew = false;
        isFeatured = true;
        postedDaysAgo = 8;
      },
      {
        id = 11;
        title = "Commercial Space on Waghodia Road";
        description = "Ground-floor commercial space ideal for retail, clinic, or office setup. High footfall area with ample parking and visibility.";
        price = 6500000;
        priceLabel = "₹65 Lac";
        propertyType = #Commercial;
        bedrooms = 0;
        bathrooms = 1;
        areaSqft = 800;
        location = "Waghodia Road, Vadodara";
        locality = "Waghodia Road";
        furnished = "Unfurnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600"
        ];
        tags = [#InvestmentReady];
        budgetRange = #FiftyTo80L;
        isNew = true;
        isFeatured = false;
        postedDaysAgo = 6;
      },
      {
        id = 12;
        title = "Near-School 2BHK in Savli Road";
        description = "Ideal for families with children. Just 200m from two reputed English-medium schools. Quiet neighborhood with round-the-clock security.";
        price = 3800000;
        priceLabel = "₹38 Lac";
        propertyType = #Apartment;
        bedrooms = 2;
        bathrooms = 2;
        areaSqft = 980;
        location = "Savli Road, Vadodara";
        locality = "Savli Road";
        furnished = "Semi-Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600",
          "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600"
        ];
        tags = [#NearSchools, #FamilyFriendly, #ReadyToMove];
        budgetRange = #ThirtyTo50L;
        isNew = false;
        isFeatured = false;
        postedDaysAgo = 12;
      },
      {
        id = 13;
        title = "High-ROI Plot in Waghodia Road Corridor";
        description = "Strategically located plot near upcoming commercial zone on Waghodia Road. Ideal for long-term investment with strong appreciation potential.";
        price = 2200000;
        priceLabel = "₹22 Lac";
        propertyType = #Plot;
        bedrooms = 0;
        bathrooms = 0;
        areaSqft = 1200;
        location = "Waghodia Road, Vadodara";
        locality = "Waghodia Road";
        furnished = "NA";
        imageUrls = [
          "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600",
          "https://images.unsplash.com/photo-1628744876497-eb05fab3bc44?w=600"
        ];
        tags = [#InvestmentReady];
        budgetRange = #Under30L;
        isNew = true;
        isFeatured = false;
        postedDaysAgo = 9;
      },
      {
        id = 14;
        title = "Luxury 3BHK with Amenities in New Sama";
        description = "Premium 3BHK in a landmark tower with rooftop pool, gymnasium, landscaped gardens, and intercom facility. Experience resort-style living.";
        price = 7200000;
        priceLabel = "₹72 Lac";
        propertyType = #Apartment;
        bedrooms = 3;
        bathrooms = 3;
        areaSqft = 1750;
        location = "New Sama, Vadodara";
        locality = "New Sama";
        furnished = "Fully Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600"
        ];
        tags = [#LuxuryAmenities, #FamilyFriendly, #GreatView, #InvestmentReady];
        budgetRange = #FiftyTo80L;
        isNew = true;
        isFeatured = true;
        postedDaysAgo = 2;
      },
      {
        id = 15;
        title = "Compact 1BHK on Sama Road";
        description = "Well-located 1BHK suitable for rental investment or own use. Walking distance to Sama bus depot and supermarkets.";
        price = 2500000;
        priceLabel = "₹25 Lac";
        propertyType = #Apartment;
        bedrooms = 1;
        bathrooms = 1;
        areaSqft = 580;
        location = "Sama Road, Vadodara";
        locality = "Sama Road";
        furnished = "Semi-Furnished";
        imageUrls = [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600",
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600"
        ];
        tags = [#ReadyToMove, #InvestmentReady];
        budgetRange = #Under30L;
        isNew = false;
        isFeatured = false;
        postedDaysAgo = 25;
      },
    ];
    for (p in samples.values()) {
      properties.add(p);
    };
  };
};
