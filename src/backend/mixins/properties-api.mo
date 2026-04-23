import Types "../types/properties";
import PropertiesLib "../lib/properties";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  properties : List.List<Types.Property>,
  inquiries : List.List<Types.Inquiry>,
) {
  var nextInquiryId : Nat = 0;

  public query func getProperties(filter : Types.PropertyFilter) : async [Types.Property] {
    PropertiesLib.filterProperties(properties, filter)
  };

  public query func getProperty(id : Nat) : async ?Types.Property {
    PropertiesLib.getById(properties, id)
  };

  public query func getRecommended(limit : Nat) : async [Types.Property] {
    PropertiesLib.getRecommended(properties, limit)
  };

  public query func getFeatured() : async [Types.Property] {
    PropertiesLib.getFeatured(properties)
  };

  public shared func submitInquiry(
    name : Text,
    phone : Text,
    message : Text,
    propertyId : ?Nat,
  ) : async Nat {
    let id = PropertiesLib.addInquiry(
      inquiries,
      nextInquiryId,
      name,
      phone,
      message,
      propertyId,
      Time.now(),
    );
    nextInquiryId += 1;
    id
  };

  public query func getInquiries() : async [Types.Inquiry] {
    inquiries.toArray()
  };
};
