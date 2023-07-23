{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/ffce3e381807c51a98cc62bd1afa251a0456248c";
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
                "nodejs-16.20.1"
              ];
            };
          };
      in
      {
        devShells.default = with pkgs;
          mkShell {
            buildInputs = [
              nodejs_16
              dprint
              cargo-make
              nil
              nixpkgs-fmt
              typos
              actionlint
            ];
          };
      });
}
