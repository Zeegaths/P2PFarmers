import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Types "types";
import Dto "dtos";
import Map "mo:map/Map";
import { hash } "mo:base/Hash";
import { phash; thash; nhash } "mo:map/Map";
import Vector "mo:vector";
import Debug "mo:base/Debug";
import Utils "utils";

shared ({ caller }) actor class Backend() {
  type Result<A, B> = Types.Result<A, B>;
  type Agent = Types.Agent;
  type Buyer = Types.Buyer;
  type Farmer = Types.Farmer;
  type Farm = Types.Farm;
  type Product = Types.Product;
  
  stable var acls = Vector.new<Principal>();
  stable let agents = Map.new<Principal, Agent>();
  stable let buyers = Map.new<Principal, Buyer>();

  stable var owner = caller;

  // Check if principal is owner
  private func _isOwner(p : Principal) : Bool {
    Debug.print(Principal.toText(owner));
    Debug.print(Principal.toText(p));
    Debug.print(debug_show (Principal.toText(p) == Principal.toText(owner)));
    Principal.equal(owner, p);
  };

  // Check if principal is allowed
  private func _isAllowed(p : Principal) : Bool {
    if (_isOwner(p)) {
      return true;
    };
    for (k in Vector.vals(acls)) {
      if (Principal.equal(p, k)) {
        return true;
      };
    };
    return false;
  };

  // Get acls
  public query func getAcls() : async [Principal] {
    Vector.toArray(acls);
  };

  // Get owner
  public query func getOwner() : async Principal {
    owner;
  };

  // Add acls
  public shared ({ caller }) func addAcls(p : Principal) : () {
    assert _isOwner(caller);
    Vector.add(acls, p);
  };

  // Remove acls
  public shared ({ caller }) func removeAcls(p : Principal) : async Result<(), Text> {
    assert _isOwner(caller);
    let newAcls = Vector.new<Principal>();
    if (Vector.contains<Principal>(acls, p, Principal.equal) == false) {
      return #err("Principal not found");
    };
    for (k in Vector.vals(acls)) {
      if (Principal.notEqual(p, k)) {
        Vector.add(newAcls, k);
      };
    };
    acls := newAcls;
    #ok();
  };

  public shared ({ caller }) func registerAgent(data: Dto.CreateUser) : async Result<Text, Text> {
    let user = Map.get(agents, phash, caller);
    switch (user) {
      case (?_) {
        return #err("Agent already registered");
      };
      case (null) {
        let newAgent: Agent = {
          id = await Utils.uuid();
          firstName = data.firstName;
          lastName = data.lastName;
          phone = data.phone;
          email = data.email;
          address = null;
          businessRegNo = null;
          deviceId = null;
          postalCode = null;
          country = null;
          cityName = null;
          stateCode = null;
          latitude = null;
          longitude = null;
          profilePicture = null;
          farms = Map.new<Text, (Farmer, Farm)>();
        };
        Map.set(agents, phash, caller, newAgent);
        #ok(newAgent.id);
      };
    };
  };

  public shared ({ caller }) func completeAgentProfile(data: Dto.CompleteAgentBio) : async Result<Text, Text> {
    let member = Map.get(agents, phash, caller);
    switch (member) {
      case (?user) {
        let updatedUser: Agent = {
          id = user.id;
          firstName = user.firstName;
          lastName = user.lastName;
          phone = user.phone;
          email = user.email;
          address = ?data.address;
          businessRegNo = ?data.businessRegNo;
          deviceId = data.deviceId;
          postalCode = data.postalCode;
          country = ?data.country;
          cityName = ?data.cityName;
          stateCode = ?data.stateCode;
          latitude = data.latitude;
          longitude = data.longitude;
          profilePicture = ?data.profilePicture;
          farms = Map.new<Text, (Farmer, Farm)>();
        };
        Map.set(agents, phash, caller, updatedUser);
        #ok("Agent updated successfully");
      };
      case (null) {
        #err("Agent does not exist");
      };
    };
  };

  public shared ({ caller }) func registerBuyer(data: Dto.CreateUser) : async Result<Text, Text> {
    let user = Map.get(buyers, phash, caller);
    switch (user) {
      case (?_) {
        return #err("Buyer already registered");
      };
      case (null) {
        let newUser: Buyer = {
          id = await Utils.uuid();
          firstName = data.firstName;
          lastName = data.lastName;
          phone = data.phone;
          email = data.email;
          address = null;
          businessRegNo = null;
          businessName = null;
          deviceId = null;
          postalCode = null;
          country = null;
          cityName = null;
          stateCode = null;
          latitude = null;
          longitude = null;
          profilePicture = null;
        };
        Map.set(buyers, phash, caller, newUser);
        #ok(newUser.id);
      };
    };
  };
};
