{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        # https://discourse.nixos.org/t/mark-a-devshell-dependency-as-insecure/24354/3
        pkgs = import nixpkgs
          {
            inherit system;
            config = {
              permittedInsecurePackages = [
                "nodejs-16.20.0"
              ];
            };
          };
      in
      {
        devShells.default = with pkgs;
          mkShell {
            buildInputs = [
              nodejs-16_x
              dprint
              cargo-make
              nil
              nixpkgs-fmt
              typos
            ];
          };
      });
}
