<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" encoding="UTF-8" omit-xml-declaration="yes" standalone="yes" indent="yes" />

	<xsl:template match="/*">
<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
<html>
	<head>
		<title>Copy</title>
		<style></style>
	</head>
	<body>
		<textarea rows='40' cols='160'>
		<xsl:copy-of select='.'/>
		</textarea>
	</body>
</html>
	</xsl:template>
</xsl:stylesheet>
