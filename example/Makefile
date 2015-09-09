groupId=com.dsleng.dtool.xtext
artifactId=com.dsleng.dtool.xtext
version=1.0.0-SNAPSHOT 
langName="langDSL"
langExt="vwx"
ModelBundle="com.dsleng.etool.presentation"
GenModelFile="platform:/resource/com.dsleng.etool.presentation/model/view.genmodel"
GenerateEPackage="com.dsleng.etool.presentation.view.ViewPackage"
ModelURI="http://com/dsleng/etool/presentation/view/"
base=${artifactId}

archetypeGroupId=com.dsleng.archetype
archetypeArtifactId=com.dsleng.archetype.xtext.plugin
archetypeVersion=1.0.0-SNAPSHOT

opts=-DarchetypeCatalog=local
mvn= mvn archetype:generate  $(opts) -B
parent=parent
lang=presentation.view

parentId=$(artifactId).$(parent)


package=com.dsleng.dtool.xtext

all: clean parent lang ui tests sdk

clean:
	rm -rf $(artifactId)
	rm -rf $(artifactId).ui
	rm -rf $(artifactId).tests
	rm -rf $(artifactId).sdk
	rm -rf $(artifactId).$(parent)
parent:
	 $(mvn) -DarchetypeGroupId=$(archetypeGroupId) -DarchetypeArtifactId=com.dsleng.archetype.xtext.parent -DarchetypeVersion=$(archetypeVersion) -DgroupId=$(groupId) -DartifactId=$(artifactId).$(parent) -Dversion=$(version) -Dpackage=$(artifactId)  -Dfilter=com.dsleng
lang:
	 $(mvn)  -DarchetypeGroupId=$(archetypeGroupId) -DarchetypeArtifactId=com.dsleng.archetype.xtext.lang -DarchetypeVersion=$(archetypeVersion) -DgroupId=$(groupId) -DartifactId=$(artifactId) -Dversion=$(version) -Dpackage=$(artifactId)  -DparentId=$(parentId) -DlangName=$(langName) -D langExt=$(langExt) -Dfilter=com.dsleng -DGenModelFile=${GenModelFile} -DGenerateEPackage=${GenerateEPackage} -DModelURI=$(ModelURI) -DModelBundle=$(ModelBundle)
ui:
	 $(mvn)  -DarchetypeGroupId=$(archetypeGroupId) -DarchetypeArtifactId=com.dsleng.archetype.xtext.ui -DarchetypeVersion=$(archetypeVersion) -DgroupId=$(groupId) -DartifactId=$(artifactId).ui -Dversion=$(version) -Dpackage=$(artifactId).ui  -DparentId=$(parentId) -Dfilter=com.dsleng -DModelBundle=$(ModelBundle) -Dbase=$(base)
tests:
	 $(mvn)  -DarchetypeGroupId=$(archetypeGroupId) -DarchetypeArtifactId=com.dsleng.archetype.xtext.ui -DarchetypeVersion=$(archetypeVersion) -DgroupId=$(groupId) -DartifactId=$(artifactId).tests -Dversion=$(version) -Dpackage=$(artifactId).tests  -DparentId=$(parentId) -Dfilter=com.dsleng -DModelBundle=$(ModelBundle) -Dbase=$(base)
sdk:
	 $(mvn)  -DarchetypeGroupId=$(archetypeGroupId) -DarchetypeArtifactId=com.dsleng.archetype.xtext.sdk -DarchetypeVersion=$(archetypeVersion) -DgroupId=$(groupId) -DartifactId=$(artifactId).sdk -Dversion=$(version) -Dpackage=$(artifactId).sdk  -DparentId=$(parentId) -Dfilter=com.dsleng -DModelBundle=$(ModelBundle) -Dbase=$(base)


