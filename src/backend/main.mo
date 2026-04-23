import Types "types/properties";
import PropertiesApi "mixins/properties-api";
import PropertiesLib "lib/properties";
import List "mo:core/List";

actor {
  let properties = List.empty<Types.Property>();
  let inquiries = List.empty<Types.Inquiry>();

  PropertiesLib.seedProperties(properties);

  include PropertiesApi(properties, inquiries);
};
