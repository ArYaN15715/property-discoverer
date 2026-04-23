module {
  public type PropertyType = {
    #Apartment;
    #Villa;
    #Plot;
    #Commercial;
    #Penthouse;
  };

  public type BudgetRange = {
    #Under30L;
    #ThirtyTo50L;
    #FiftyTo80L;
    #Above80L;
  };

  public type LifestyleTag = {
    #FamilyFriendly;
    #NearSchools;
    #InvestmentReady;
    #ReadyToMove;
    #LuxuryAmenities;
    #GreatView;
  };

  public type Property = {
    id : Nat;
    title : Text;
    description : Text;
    price : Nat;
    priceLabel : Text;
    propertyType : PropertyType;
    bedrooms : Nat;
    bathrooms : Nat;
    areaSqft : Nat;
    location : Text;
    locality : Text;
    furnished : Text;
    imageUrls : [Text];
    tags : [LifestyleTag];
    budgetRange : BudgetRange;
    isNew : Bool;
    isFeatured : Bool;
    postedDaysAgo : Nat;
  };

  public type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
    propertyId : ?Nat;
    timestamp : Int;
  };

  public type PropertyFilter = {
    budgetRange : ?BudgetRange;
    locality : ?Text;
    tags : [LifestyleTag];
    propertyType : ?PropertyType;
    searchQuery : ?Text;
  };
};
